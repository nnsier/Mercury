import React from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/UI/HeaderButton';

const JogOverviewScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>View your jogs</Text>
      <Text>ALL JOGS WILL GO HERE</Text>
    </View>
  );
};

JogOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: `Look how far we've gone`,
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  }
})

export default JogOverviewScreen;