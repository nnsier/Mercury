import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const JogItem = props => {
  const date = new Date(props.date).toDateString();
  const time = new Date(props.date).toLocaleTimeString();

  const rawHours = Math.floor(
    (props.duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const rawMinutes = Math.floor((props.duration % (1000 * 60 * 60)) / (1000 * 60));
  const rawSeconds = Math.floor((props.duration % (1000 * 60)) / 1000);
  const rawMilliseconds = props.duration % 1000;
  const hours = (rawHours < 10) ? `0${rawHours}` : rawHours;
  const minutes = (rawMinutes < 10) ? `0${rawMinutes}` : rawMinutes;
  const seconds = (rawSeconds < 10) ? `0${rawSeconds}`: rawSeconds;
  const milliseconds = (rawMilliseconds < 10) ? `00${rawMilliseconds}` : ((rawMilliseconds < 100) ? `0${rawMilliseconds}` : rawMilliseconds);

  console.log(date);
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.jogItem}>
      <View>
        <Text>DISTANCE: {props.distance}</Text>
        <Text>DURATION: {hours}:{minutes}:{seconds}:{milliseconds}</Text>
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
