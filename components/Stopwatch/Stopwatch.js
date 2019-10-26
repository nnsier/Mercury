import React, { useState, useEffect } from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as Location from 'expo-location';

import * as JogActions from '../../store/actions/jog-actions';

const Stopwatch = () => {
    [completed, setCompleted] = useState(false);
    [status, setStatus] = useState(false);
    [runningTime, setRunningTime] = useState(0);
    [locations, setLocations] = useState([]);
    [timerInterval, setTimerInterval] = useState(null);
    [distanceInterval, setDistanceInterval] = useState(null);
    const dispatch = useDispatch();

    const stuff = useSelector(state => state.jogs);

    const getLocation = async () => {
        let newLocation = await Location.getCurrentPositionAsync();
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
        }, 5000))
    }

    calculateDistance = (coords1, coords2) => {
        return Math.abs(coords2.latitude - coords1.latitude) + Math.abs(coords2.longitude - coords1.longitude);
    }

    handleCompletion = async () => {
        if(completed){
            console.log('entered here');
            return
        }
        await getLocation();
        console.log(`our locations length ${locations.length}`);
        const firstLocation = locations[0];
        const lastLocation = locations[locations.length-1];
        const distance = calculateDistance(firstLocation, lastLocation);
        console.log(`this is distance: ${distance}`)
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

    const rawHours = Math.floor(
      (runningTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const rawMinutes = Math.floor((runningTime % (1000 * 60 * 60)) / (1000 * 60));
    const rawSeconds = Math.floor((runningTime % (1000 * 60)) / 1000);
    const rawMilliseconds = runningTime % 1000;
    const hours = (rawHours < 10) ? `0${rawHours}` : rawHours;
    const minutes = (rawMinutes < 10) ? `0${rawMinutes}` : rawMinutes;
    const seconds = (rawSeconds < 10) ? `0${rawSeconds}`: rawSeconds;
    const milliseconds = (rawMilliseconds < 10) ? `00${rawMilliseconds}` : ((rawMilliseconds < 100) ? `0${rawMilliseconds}` : rawMilliseconds);
    
    return(
        <View>
            <Text style={styles.clock}>{hours}:{minutes}:{seconds}:{milliseconds}</Text>
            <View style={styles.buttonRow}>
                {!status 
                ? <Button title="Start" onPress={handleClick}/>
                : <Button title="Pause" onPress={handleClick}/>
                }
                <Button title="Complete" onPress={handleCompletion}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    clock: {
        fontSize: 24,
    }
})

export default Stopwatch;