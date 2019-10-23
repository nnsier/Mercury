import React, { useState, useEffect } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

import JogNavigator from "./navigation/JogNavigator";
import { init } from "./helpers/db";

import jogsReducer from "./store/reducers/jog-reducers";
import intervalsReducer from "./store/reducers/interval-reducers";

export default function App() {
  const rootReducer = combineReducers({
    jogs: jogsReducer,
    intervals: intervalsReducer
  });
  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  init()
    .then(() => {
      console.log("Initialized database");
    })
    .catch(err => {
      console.log("Initializing database failed");
      console.log(err);
    });

  const fetchFonts = () => {
    return Font.loadAsync({
      "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
      "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
    });
  };

  const getLocationAsync = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status === "granted") {
      return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    } else {
      throw new Error("Location permission not granted");
    }
  };
  useEffect(() => {
    getLocationAsync();
  });
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <JogNavigator />
    </Provider>
  );
}
