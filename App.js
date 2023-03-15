//import liraries
import React, {Component, useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';

import {View, Text, StyleSheet} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {Vibration} from 'react-native';
import {
  useRingerMode,
  RINGER_MODE,
  checkDndAccess,
  requestDndAccess,
} from 'react-native-ringer-mode';
// import BackgroundFetch from 'react-native-background-fetch';
const officeLocation = {
  latitude: 22.550924131238745,
  longitude: 72.92408187298277,
  radius: 2000, // in meters
};

// create a component
const App = () => {
  // Start watching the user's location
  const {mode, setMode, error} = useRingerMode();
  const [events, setEvents] = useState([]);
  const [fcmTokenValue, setFcmTokenValue] = useState(null);
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const initBackgroundFetch = async () => {
    // BackgroundFetch event handler.
    const onEvent = async taskId => {
      console.log('[BackgroundFetch] task: ', taskId);
      // Do your background work...
      demo();
      // await addEvent(taskId);
      // IMPORTANT:  You must signal to the OS that your task is complete.
      // BackgroundFetch.finish(taskId);
    };

    // Timeout callback is executed when your Task has exceeded its allowed running-time.
    // You must stop what you're doing immediately BackgroundFetch.finish(taskId)
    //   const onTimeout = async taskId => {
    //     console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
    //     BackgroundFetch.finish(taskId);
    //   };

    //   // Initialize BackgroundFetch only once when component mounts.
    //   let status = await BackgroundFetch.configure(
    //     {minimumFetchInterval: 15},
    //     onEvent,
    //     onTimeout,
    //   );

    //   console.log('[BackgroundFetch] configure status: ', status);
    // };

    // Add a BackgroundFetch event to <FlatList>
    // const addEvent = taskId => {
    //   // Simulate a possibly long-running asynchronous task with a Promise.
    //   return new Promise((resolve, reject) => {
    //     setEvents([
    //       ...events,
    //       {
    //         taskId: taskId,
    //         timestamp: new Date().toString(),
    //       },
    //     ]);

    //     resolve();
    //   });
  };
  const isWithinDistance = currentCoords => {
    console.log('currentCoords', currentCoords);
    const R = 6371e3; // Earth's radius in meters
    const lat1 = currentCoords.latitude; //coords1
    const lon1 = currentCoords.longitude;
    const lat2 = 22.5714541; //coords1
    const lon2 = 72.9530047;
    // ^^^ ** NEAR HOME

    // const lat2 = 22.5488447; //coords1
    // const lon2 = 72.9241539;
    // ^^^ ** CODENTIC SOFTWARE
    // 22.55296695614197, 72.9237140442651
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;
    console.log('Δφ =>', Δφ);
    console.log('Δφ =>', Δλ);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    console.log('distance', distance);
    if (distance <= 30) {
      // 50 meters
      console.log('inside ifdistance =>', distance);
      return true;
    }
    console.log('outside ifdistance =>', distance);
    return false;
  };
  const demo = () =>
    Geolocation.watchPosition(
      position => {
        console.log('position', position.coords);
        if (isWithinDistance(position?.coords)) {
          // if (isWithinDistance(position.coords)) {
          // Vibration.vibrate([0]);
          setMode(RINGER_MODE.vibrate);
          // console.log('Vibration', Vibration.vibrate[0]);
        } else {
          setMode(RINGER_MODE.normal);
        }
      },
      error => {
        console.log('error', error);
      },
    );

  const fcmToken = async () => {
    let token = await messaging().getToken();
    console.log('TOKEM==<>', token);
    setFcmTokenValue(token ?? null);
  };

  useEffect(() => {
    fcmToken();
    // demo();
    // initBackgroundFetch();
  }, []);
  const modeText = {
    [RINGER_MODE.silent]: 'Silent',
    [RINGER_MODE.normal]: 'Normal',
    [RINGER_MODE.vibrate]: 'Vibrate',
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SAMPLE NOTIFICATION</Text>
      <Text style={styles.tokenValue}>TOKEN :: {fcmTokenValue}</Text>
      <View>
        <Text>{error?.message}</Text>
      </View>
    </View>
    // <View style={styles.container}>
    //   <Text>AUTO SILENT</Text>
    //   <Text>Ringer Mode: {mode !== undefined ? modeText[mode] : null}</Text>
    //   <View>
    //     <Text>{error?.message}</Text>
    //   </View>
    // </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    marginBottom: 10,
  },
  tokenValue: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
  },
});

//make this component available to the app
export default App;
