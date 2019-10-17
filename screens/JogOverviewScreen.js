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
import HeaderButton from "../components/UI/HeaderButton";

const JogOverviewScreen = props => {
  const jogs = useSelector(state => state.jogs.jogs);
  console.log(jogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(jogsActions.loadJogs());
  }, [dispatch]);

  return (
    <FlatList
      data={jogs}
      keyExtractor={item => item.id.toString()}
      renderItem={itemData => (
      <JogItem
        onSelect={()=> {
          props.navigation.navigate('JogDetail', {
            jogTitle: itemData.item.id.toString(),
            jogId: itemData.item.id.toString()
          })
        }}
      />)
    }
    />
  );
};

JogOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: `Look how far we've gone`
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
