import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import JoggingScreen from '../screens/JoggingScreen';
import JogOverviewScreen from '../screens/JogOverviewScreen';
import JogDetailScreen from '../screens/JogDetailScreen';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

//Do I do this?
const JogNavigator = createStackNavigator({
  Jogging: JoggingScreen,
  JogOverview: JogOverviewScreen,
  JogDetail: JogDetailScreen,
}, {
  defaultNavigationOptions: defaultNavOptions
})

export default createAppContainer(JogNavigator);