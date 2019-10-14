import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import JogNavigator from './navigation/JogNavigator';
import {init} from './helpers/db';

init().then(() => {
    console.log('Initialized database');
  }).catch(err => {
    console.log('Initializing database failed');
    console.log(err);
  })

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => { setFontLoaded(true) }}
      />
    )
  }

  return (
    <JogNavigator />
  );
}