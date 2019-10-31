import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  FlatList
} from "react-native";
import { ScreenOrientation } from 'expo'
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import JogItem from "../components/Jog/JogItem";
import * as jogsActions from "../store/actions/jog-actions";
import * as intervalsActions from '../store/actions/interval-actions';
import HeaderButton from "../components/UI/HeaderButton";

const JogOverviewScreen = props => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
  // })
  // const lockOrientation = () => {
  //   ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
  // }
  // lockOrientation();
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
            ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE)
            setTimeout(()=>{props.navigation.navigate("JogDetail", {
              jogTitle: itemData.item.id.toString(),
              jogId: itemData.item.id.toString()
            });},50)
            
          }}
        />
      )}
    />
  );
};

JogOverviewScreen.navigationOptions = navData => {
  return {
    headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='Jogging Overview'
        iconName={Platform.OS === 'android' ? 'md-flash' : 'ios-flash'}
        onPress={() => {
          ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT)
          navData.navigation.goBack()
        }}

      />
    </HeaderButtons>),
    headerTitle: `Jogs`
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
