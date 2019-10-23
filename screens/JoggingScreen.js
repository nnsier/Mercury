import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import * as Location from 'expo-location';
import * as jogsActions from '../store/actions/jog-actions';
import {insertJog, insertInterval, getJogs, getIntervals, dropTables} from '../helpers/db';

import HeaderButton from '../components/UI/HeaderButton';


const JoggingScreen = props => {
  const [locations, setLocations] = useState([]);
  const [time, setTime] = useState(0);
  let nIntervId;
  const dispatch = useDispatch()
  const [distanceValue, setDistanceValue] = useState(0);

  const fetchLocations = async () => {
    
    console.log('in');
    const fetchLocation = async () => {
      let newLocation =  await Location.getCurrentPositionAsync();
      setLocations([...locations, newLocation]);
      setTime(newLocation.timestamp);
      console.log(newLocation.timestamp);
    }
    nIntervId = setInterval(fetchLocation,1);
  }

  const stopTimerHandler = () => {
    clearInterval(nIntervId);
  }

  const finishJog = (distance, duration) => {
    const now = Date.now();
    insertJog(distance, duration, now).then((result)=>{console.log(JSON.stringify(result))}).catch((err) => {console.log(err)})
  }

  const grabJogs = () => {
    getJogs().then(result => {console.log(JSON.stringify(result))}).catch(err => {console.log(err)})
  }

  const addInterval = (latitude, longitude, jogs_reference) => {
    const now = Date.now();
    insertInterval(latitude, longitude, now, jogs_reference).then((result)=>{console.log(JSON.stringify(result))}).catch((err) => {console.log(err)})
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
      <Text style={styles.clock}>{time}</Text>
      <View style={styles.buttonRow}>
        <Button title="Grab jogs" onPress={() => grabJogs()} />
        <Button title="Start" onPress={fetchLocations} />
        <Button title="Stop" onPress={stopTimerHandler} />
        <Button title="Save Jog" onPress={saveJogHandler} />
        <Button title= "DROP ALL TABLES" onPress={dropTables} />
        <Button title="Add Interval" onPress={()=> addInterval(13.2, 14.3, 2)} />
        <Button title="Grab int" onPress={grabIntervals} />
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