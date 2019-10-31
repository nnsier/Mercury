import React, { useState, useEffect } from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {calculateDistance} from '../../helpers/distance';
import * as Location from 'expo-location';

import * as JogActions from '../../store/actions/jog-actions';
import {timeToString} from '../../helpers/time';
import { AuthSession } from 'expo';

const Stopwatch = () => {
    [completed, setCompleted] = useState(false);
    [status, setStatus] = useState(false);
    [runningTime, setRunningTime] = useState(0);
    [locations, setLocations] = useState([]);
    [timerInterval, setTimerInterval] = useState(null);
    [distanceInterval, setDistanceInterval] = useState(null);
    const dispatch = useDispatch();

    const handleReset = () => {
        setCompleted(false);
        setStatus(false);
        setRunningTime(0);
        setLocations([]);
        clearInterval(timerInterval);
        clearInterval(distanceInterval);
    }

    const stuff = useSelector(state => state.jogs);

    const getLocation = async () => {
        let newLocation = await Location.getCurrentPositionAsync();
        console.log(newLocation);
        let {timestamp} = newLocation;
        let {latitude, longitude, speed} = newLocation.coords;
        setLocations([...locations, {latitude, longitude, speed, timestamp}])
    }


    const startTimer = () => {
        const startTime = Date.now() - runningTime;
        getLocation();
        setTimerInterval(setInterval(() => {
            setRunningTime(Date.now() - startTime);
        }))
        setDistanceInterval(distanceCheck = setInterval(()=> {
            console.log(runningTime);
            getLocation()
        }, 10000))
    }

    handleCompletion = async () => {
        if(completed){
            console.log('entered here');
            return
        }
        await getLocation();
        const firstLocation = locations[0];
        const lastLocation = locations[locations.length-1];
        const distance = calculateDistance(firstLocation, lastLocation);
        console.log(`this is distance in meters: ${distance}`)
        console.log(`this is runningTime: ${runningTime}`)
        
        const date = Date.now();
        console.log(`this is date ${date}`)
        dispatch(JogActions.addJog(runningTime, date, distance, locations));
        clearInterval(timerInterval);
        clearInterval(distanceInterval);
        setCompleted(true)
    }

    handleClick = () => {
        if(status) {
            clearInterval(timerInterval);
            clearInterval(distanceInterval);
        } else {
            startTimer()
        }
        setStatus(!status)
        console.log(status);
        console.log(locations)
    }

    useEffect(() => {
        return () => {
            clearInterval(timerInterval);
            clearInterval(distanceInterval);
            console.log('will umount');
        }
    },[]);

    
    const timeString = timeToString(runningTime);

    return(
        <View style={styles.container}>
            <Text style={styles.clock}>{timeString}</Text>
            <View style={styles.buttonRow}>
                {!status 
                ? <Button title="Start" onPress={handleClick}/>
                : <Button title="Pause" onPress={handleClick}/>
                }
                <Button title="Complete" onPress={handleCompletion}/>
                <Button title="Clear" onPress={handleReset} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // marginHorizontal: 20,
        alignItems: 'center'
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    clock: {
        fontSize: 36,
        width: 250
 
    }
})

export default Stopwatch;