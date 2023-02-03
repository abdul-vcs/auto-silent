//import liraries
import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import axios from 'axios';
import {authorize, refresh} from 'react-native-app-auth';
// const config =
// create a component
const App = () => {
  // useEffect(() => {}, []);
  const [activityData, setActivityData] = useState([]);
  const config = {
    clientId: '2399G6',
    clientSecret: '71af2bb56ac5b1e205483cbcc562ea36',
    redirectUrl: 'https://www.google.com/', //note: path is required
    scopes: [
      'activity',
      'heartrate',
      'location',
      'nutrition',
      'profile',
      'settings',
      'sleep',
      'social',
      'weight',
    ],
    serviceConfiguration: {
      authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
      tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
      revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke',
    },
  };

  // Log in to get an authentication token
  const demo = async () => {
    try {
      const authState = await authorize(config);

      // Refresh token
      const refreshedState = await refresh(config, {
        refreshToken: authState.refreshToken,
      });
      console.log('authState=>', authState);
    } catch (error) {
      console.log('error=>', error);
    }
    // Log in to get an authentication token

    // // Revoke token
    // await revoke(config, {
    //   tokenToRevoke: refreshedState.refreshToken,
    //   includeBasicAuth: true,
    // });
  };

  useEffect(() => {
    demo();
    // const getActivityData = async () => {
    //   const {data} = await axios.get(
    //     'https://api.fitbit.com/1/user/-/activities/date/today.json',
    //     {
    //       headers: {
    //         Authorization: `Bearer <ACCESS_TOKEN>`,
    //       },
    //     },
    //   );
    //   setActivityData(data);
    // };
    // getActivityData();
  }, []);
  return (
    <View style={styles.container}>
      <Text>FITBIT</Text>
      <View style={styles.container}>
        <Text>Fitbit authentication example</Text>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
  },
});

//make this component available to the app
export default App;
