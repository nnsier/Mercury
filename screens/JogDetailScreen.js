import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as intervalsActions from '../store/actions/interval-actions';

const JogDetailScreen = props => {
    const jogId = props.navigation.getParam('jogId');
    const intervals = useSelector(state => state.intervals.intervals);
    console.log(intervals);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(intervalsActions.loadIntervals(jogId));
    }, [dispatch, jogId])
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