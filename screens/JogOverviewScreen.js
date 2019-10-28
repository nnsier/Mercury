import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  FlatList
} from "react-native";
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from "react-redux";

import JogItem from "../components/Jog/JogItem";
import * as jogsActions from "../store/actions/jog-actions";
import * as intervalsActions from '../store/actions/interval-actions';
import HeaderButton from "../components/UI/HeaderButton";

const JogOverviewScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(jogsActions.loadJogs());
  }, [dispatch]);
  useEffect(() => {
    dispatch(intervalsActions.loadIntervals())
  },[dispatch])

  const jogs = useSelector(state => state.jogs.jogs);
  console.log(jogs);

  return (
    <FlatList
      data={jogs}
      keyExtractor={item => item.id.toString()}
      renderItem={itemData => (
        <JogItem
          distance={itemData.item.distance}
          date={itemData.item.date}
          duration={itemData.item.duration}
          onSelect={() => {
            props.navigation.navigate("JogDetail", {
              jogTitle: itemData.item.id.toString(),
              jogId: itemData.item.id.toString()
            });
          }}
        />
      )}
    />
  );
};

JogOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: `how far we've gone`
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  }
});

export default JogOverviewScreen;
