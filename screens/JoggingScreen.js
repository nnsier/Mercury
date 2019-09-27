import React from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/UI/HeaderButton';

const JoggingScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>Start a jog</Text>
      <Text>Time will be here.</Text>
      <View style={styles.buttonRow}>
        <Button title="Start" onPress={() => { }} />
        <Button title="Stop" onPress={() => { }} />
        <Button title="Submit" onPress={() => { }} />
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