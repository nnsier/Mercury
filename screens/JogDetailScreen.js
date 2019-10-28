import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Interval from '../models/interval'

import * as intervalsActions from '../store/actions/interval-actions';

const JogDetailScreen = props => {
    const jogId = props.navigation.getParam('jogId');
    console.log(`my jogId = ${jogId}`);
   
    const intervals = useSelector(state => state.intervals.intervals);
    const filtered = intervals.filter(interval => interval.jogs_referenceId == jogId);
    console.log(filtered);
    // console.log(intervals);
    console.log('did this work?')
    // console.log(intervals);
    const dispatch = useDispatch();

    // useEffect(()=> {
    //     dispatch(intervalsActions.loadIntervals(jogId));
    // }, [dispatch, jogId])
//this is where we will fetch all intervals for a jog id
    return(
        <View>
            <Text>JogDetailScreen</Text>
        </View>
    );
}

JogDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('jogTitle')
    }
}

const styles = StyleSheet.create({});

export default JogDetailScreen;