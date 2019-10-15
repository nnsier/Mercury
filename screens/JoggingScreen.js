import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import {insertJog, getJogs, dropTables} from '../helpers/db';

import HeaderButton from '../components/UI/HeaderButton';



const JoggingScreen = props => {
  const finishJog = (distance, duration) => {
    const now = Date.now();
    // const now = dateObj.now();
    console.log(now);
    insertJog(distance, duration, now).then((result)=>{console.log(JSON.stringify(result))}).catch((err) => {console.log(err)})
  }
  const grabJogs = () => {
    getJogs().then(result => {console.log(JSON.stringify(result))}).catch(err => {console.log(err)})
  }

  return (
    <View style={styles.screen}>
      <Text>Start a jog</Text>
      <Text>Time will be here.</Text>
      <View style={styles.buttonRow}>
        <Button title="Start" onPress={() => grabJogs()} />
        <Button title="Stop" onPress={() => { console.log('stop')}} />
        <Button title="Finish" onPress={() => {finishJog('12', '50:20:30')}} />
        <Button title= "DROP ALL TABLES" onPress={dropTables} />
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
        iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
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
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default JoggingScreen;