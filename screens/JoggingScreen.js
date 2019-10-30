import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import {ScreenOrientation} from 'expo';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import * as Location from 'expo-location';
import * as jogsActions from '../store/actions/jog-actions';
import {insertJog, insertInterval, getJogs, getIntervals, dropTables, fetchJogs, fetchIntervals} from '../helpers/db';

import HeaderButton from '../components/UI/HeaderButton';
import Stopwatch from '../components/Stopwatch/Stopwatch';


const JoggingScreen = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
  })
  const lockOrientation = () => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
  }
  lockOrientation();
  
  useEffect(()=> {
    dispatch(jogsActions.loadJogs())
  }, [dispatch])
  const grabJogs = () => {
    fetchJogs().then(result => {console.log(JSON.stringify(result))}).catch(err => {console.log(err)})
  }

  const addInterval = (latitude, longitude, jogs_referenceId) => {
    const now = Date.now();
    insertInterval(latitude, longitude, now, jogs_referenceId).then((result)=>{console.log(JSON.stringify(result))}).catch((err) => {console.log(err)})
  }

  const grabIntervals = () => {
    getIntervals().then(result => {console.log(JSON.stringify(result))}).catch(err => {console.log(err)})
  }

  const saveJogHandler = () => {
    dispatch(jogsActions.addJog(Math.random(), Date.now(), Math.random()))
  }

  return (
    <View style={styles.screen}>
    <Text>Start a jog</Text>
    <View style={styles.buttonRow}>
      <Stopwatch />
      <Button title="DROP LEZ TABLES" onPress={dropTables} />
      <Button title="Get JOgs" onPress={grabJogs} />
      <Button title="get inters" onPress={grabIntervals} />
    </View>
  </View>
  );
};

JoggingScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Mercury',
    headerRight: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='Jogging Overview'
        iconName={Platform.OS === 'android' ? 'md-flash' : 'ios-flash'}
        onPress={() => {
          navData.navigation.navigate('JogOverview')
        }}

      />
    </HeaderButtons>)
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  clock: {
    fontSize: 40,
  },
  buttonRow: {
    // flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default JoggingScreen;