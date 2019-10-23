import React, { useState, useEffect } from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import * as Location from 'expo-location';

const Stopwatch = () => {
    [status, setStatus] = useState(false);
    [runningTime, setRunningTime] = useState(0);
    [locations, setLocations] = useState([]);
    [timerInterval, setTimerInterval] = useState(null);
    [distanceInterval, setDistanceInterval] = useState(null);

    const getLocation = async () => {
        let newLocation = await Location.getCurrentPositionAsync();
        let {timestamp} = newLocation;
        let {latitude, longitude, speed} = newLocation.coords;
        setLocations([...locations, {latitude, longitude, speed, timestamp}])
    }


    const startTimer = () => {
        const startTime = Date.now() - runningTime;
        setTimerInterval(setInterval(() => {
            setRunningTime(Date.now() - startTime);
        }))
        setDistanceInterval(distanceCheck = setInterval(()=> {
            console.log(runningTime);
            getLocation()
        }, 1000))
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
                <Button title="Complete" />
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