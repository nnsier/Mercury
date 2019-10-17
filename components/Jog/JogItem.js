import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const JogItem = props => {
  return (
    <TouchableOpacity
      onPress={props.onSelect}
      style={styles.jogItem}
    ><View>
        <Text>"DISTANCE"</Text>
        <Text>"DURATION"</Text>
        <Text>"DATE"</Text>
        </View>
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
