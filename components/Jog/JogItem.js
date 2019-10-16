import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const JogItem = props => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log("We've selected");
      }}
      style={styles.jogItem}
    >
        <Text>DISTANCE</Text>
        <Text>DURATION</Text>
        <Text>DATE</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    jogItem: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingVertical: 15,
        alignItems: 'center'
    },
})

export default JogItem;
