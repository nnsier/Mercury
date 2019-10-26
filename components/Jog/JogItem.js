import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const JogItem = props => {
  const date = new Date(props.date).toDateString();
  const time = new Date(props.date).toLocaleTimeString();
  console.log(date);
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.jogItem}>
      <View>
        <Text>DISTANCE: {props.distance}</Text>
        <Text>DURATION: {props.duration}</Text>
        <Text>{time} {date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  jogItem: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 15,
    alignItems: "center"
  }
});

export default JogItem;
