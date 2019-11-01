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
  
  

  const grabDistance = (intervals) => {
    
    const grabbedDistances = [];
    for(let i = 0; i < intervals.length-1; i++){
        grabbedDistances.push(calculateDistance(intervals[i], intervals[i+1]))

    }
    console.log(grabbedDistances);
    return grabbedDistances;
  }

  // grabDistance(filtered)

  const distances = grabDistance(filtered);
  console.log(`Check out dem distances: ${distances}`)

  const grabTimes = (intervals) => {
    let startingTime = intervals[0].timestamp;
    console.log(intervals);
    const grabbedTimes = [];
    for(let i = 1; i <intervals.length; i++){
      grabbedTimes.push(intervals[i].timestamp - startingTime);
    }
    return grabbedTimes;
  }

  const grabbedTimes = grabTimes(filtered);

  const hours = grabbedTimes.map(time => timestampTrimmed(time))

  const createData = (hours, distances, grabbedTimes) => {
    //this is where I create a new object by iterating through
    let data = [];
    for(let i = 0; i < distances.length; i++) {
      let speed = distances[i]/grabbedTimes[i]
      data.push({time: hours[i], speed })
    }
    return data;
  }



  

  

  const newData = createData(hours, distances, grabbedTimes);
  console.log(newData);
  console.log("------------------------------");
  console.log(newData.map(data => data.time))
  console.log(newData.map(data => data.speed))


  const verticalContentInset = { top: 10, bottom: 10 };
  const xAxisHeight = 30;
  const times = newData.map(data => data.time)
  return (
    <View
      style={{
        height: Dimensions.get("window").height * 0.9,
        paddingHorizontal: 40,
        flexDirection: "row"
      }}
    >
      {/* <YAxis
        data={()=> {newData.map(data => data.speed)}}
        style={{ marginBottom: xAxisHeight }}
        contentInset={verticalContentInset}
        svg={{
          fill: "grey",
          fontSize: 10
        }}
        numberOfTicks={7}
        formatLabel={value => `${value}mph`}
      /> */}
      <View style={{ flex: 1, marginLeft: 10 }}>
        <LineChart
          style={{ flex: 1 }}
          data={newData}
          svg={{ stroke: "rgb(134, 65, 244)" }}
          contentInset={verticalContentInset}
          yAccessor={({ item }) => item.speed}
          xAccessor={({ item }) => item.time}
        >
          <Grid />
        </LineChart>

        <XAxis
          style={{ marginHorizontal: -10, height: xAxisHeight }}
          data={times}
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
