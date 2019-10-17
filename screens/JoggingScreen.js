import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import * as jogsActions from '../store/actions/jog-actions';
import {insertJog, insertInterval, getJogs, getIntervals, dropTables} from '../helpers/db';

import HeaderButton from '../components/UI/HeaderButton';




const JoggingScreen = props => {
  const dispatch = useDispatch()
  const [distanceValue, setDistanceValue] = useState(0);

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
      <Text>Time will be here.</Text>
      <View style={styles.buttonRow}>
        <Button title="Grab jogs" onPress={() => grabJogs()} />
        <Button title="Stop" onPress={() => { console.log('stop')}} />
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
  buttonRow: {
    // flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default JoggingScreen;