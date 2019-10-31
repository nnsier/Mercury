import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, Platform } from "react-native";
import { ScreenOrientation } from "expo";
import { useSelector, useDispatch } from "react-redux";
import { LineChart, Grid, YAxis, XAxis } from "react-native-svg-charts";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import {calculateDistance} from '../helpers/distance';
import {timestampTrimmed} from '../helpers/time';
import Interval from "../models/interval";
import * as intervalsActions from "../store/actions/interval-actions";
import HeaderButton from '../components/UI/HeaderButton';

const useScreenDimensions = () => {
  const [screenData, setScreenData] = useState(Dimensions.get('screen'));

  useEffect(() => {
    const onChange = result => {
      setScreenData(result.screen);
    };

    Dimensions.addEventListener('change', onChange);
    
    return () => Dimensions.removeEventListener('change', onChange);
  })
  return {
    ...screenData,
    isLandscape: screenData.width > screenData.height,
  }
}

const JogDetailScreen = props => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    
  // }
  // return function cleanup() {
  //   ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
  // }
  // );
  const screenData = useScreenDimensions();
  const switchToLandscape = () => {
    ScreenOrientation.allowAsync(ScreenOrientation.LANDSCAPE);
  };
  const jogId = props.navigation.getParam("jogId");

  const intervals = useSelector(state => state.intervals.intervals);
  const filtered = intervals.filter(
    interval => interval.jogs_referenceId == jogId
  );
  
  

  const grabSpeed = (intervals) => {
    
    const grabbedSpeeds = [];
    for(let i = 0; i < intervals.length-1; i++){
        grabbedSpeeds.push(calculateDistance(intervals[i], intervals[i+1]))

    }
    console.log(grabbedSpeeds);
    return grabbedSpeeds;
  }

  // grabSpeed(filtered)

  const speeds = grabSpeed(filtered);

  
 
  const calculateTimeDifference = (initialTimeStamp, nextTime) => {
    return nextTime - initialTimeStamp;
  }

  const grabTimes = (intervals) => {
    let startingTime = intervals[0].timestamp;
    console.log(intervals);
    const grabbedTimes = [];
    for(let i = 0; i <intervals.length; i++){
      grabbedTimes.push(timestampTrimmed(intervals[i].timestamp - startingTime));
    }
    return grabbedTimes;
  }

  console.log(grabTimes(filtered));

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

  // const speeds = data.map(item => item.speed);

  const time = data.map(item => 3);
  // const time = data.map(item => item.time);
  const verticalContentInset = { top: 10, bottom: 10 };
  const xAxisHeight = 30;
  return (
    <View
      style={{
        height: Dimensions.get("window").height * 0.9,
        paddingHorizontal: 40,
        flexDirection: "row"
      }}
    >
      <YAxis
        data={speeds}
        style={{ marginBottom: xAxisHeight }}
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
          style={{ flex: 1 }}
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
    headerTitle: navData.navigation.getParam("jogTitle"),
    headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='Jogging Overview'
        iconName={Platform.OS === 'android' ? 'md-flash' : 'ios-flash'}
        onPress={() => {
          ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT)
          navData.navigation.goBack()
        }}

      />
    </HeaderButtons>)
  };
};

export default JogDetailScreen;
