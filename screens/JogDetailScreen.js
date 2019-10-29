import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { ScreenOrientation } from "expo";
import { useSelector, useDispatch } from "react-redux";
import { LineChart, Grid, YAxis, XAxis } from "react-native-svg-charts";

import Interval from "../models/interval";

import * as intervalsActions from "../store/actions/interval-actions";

const JogDetailScreen = props => {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  });
  const switchToLandscape = () => {
    ScreenOrientation.allowAsync(ScreenOrientation.LANDSCAPE);
  };
  const jogId = props.navigation.getParam("jogId");
  console.log(`my jogId = ${jogId}`);

  const intervals = useSelector(state => state.intervals.intervals);
  const filtered = intervals.filter(
    interval => interval.jogs_referenceId == jogId
  );
  console.log(filtered);
  // console.log(intervals);
  console.log("did this work?");
  // console.log(intervals);
  const dispatch = useDispatch();

  // useEffect(()=> {
  //     dispatch(intervalsActions.loadIntervals(jogId));
  // }, [dispatch, jogId])
  //this is where we will fetch all intervals for a jog id
  const data = [
    { time: 1, speed: 2 },
    { time: 2, speed: 1 },
    { time: 3, speed: 1 },
    { time: 4, speed: 2 },
    { time: 5, speed: 3 },
    { time: 6, speed: 1 },
    { time: 7, speed: 5 },
    { time: 8, speed: 2 }
  ];

  const speeds = data.map(item => item.speed);
  const time = data.map(item => item.time);
  const verticalContentInset = { top: 10, bottom: 10 };
  const xAxisHeight = 30;
  return (
    <View style={{ height: Dimensions.get('window').height *.9, paddingHorizontal: 40, flexDirection: "row" }}>
      <YAxis
        data={speeds}
        style={{marginBottom: xAxisHeight}}
        contentInset={verticalContentInset}
        svg={{
          fill: "grey",
          fontSize: 10
        }}
        numberOfTicks={7}
        formatLabel={value => `${value}mph`}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <LineChart
          style={{ flex: 1}}
          data={data}
          svg={{ stroke: "rgb(134, 65, 244)" }}
          contentInset={verticalContentInset}
          yAccessor={({ item }) => item.speed}
          xAccessor={({ item }) => item.time}
        >
          <Grid />
        </LineChart>

        <XAxis
          style={{ marginHorizontal: -10, height: xAxisHeight }}
          data={time}
          formatLabel={(value, index) => value}
          contentInset={{ left: 10, right: 10 }}
          svg={{ fontSize: 10, fill: "black" }}
        />
      </View>
    </View>
  );
};

JogDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("jogTitle")
  };
};

const styles = StyleSheet.create({
  graphView: {
    flexDirection: "column",
    width: Dimensions.get("window").width * 0.9,
    justifyContent: "center"
  }
});

export default JogDetailScreen;
