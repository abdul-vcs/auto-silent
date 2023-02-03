//import liraries
import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// health
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health';

// create a component
const App = () => {
  // health start
  /* Permission options */
  const permissions = {
    permissions: {
      read: [
        AppleHealthKit.Constants.Permissions.HeartRate,
        AppleHealthKit.Constants.Permissions.Height,
        AppleHealthKit.Constants.Permissions.BloodType,
      ],
      write: [AppleHealthKit.Constants.Permissions.Steps],
    },
  };

  AppleHealthKit.initHealthKit(permissions, error => {
    /* Called after we receive a response from the system */

    if (error) {
      console.log('[ERROR] Cannot grant permissions!', error);
    }

    /* Can now read or write to HealthKit */

    const options = {
      startDate: new Date(2023, 0, 0).toISOString(),
    };

    AppleHealthKit.getHeartRateSamples(options, (callbackError, results) => {
      console.log('options =>', options);
      console.log('callbackError =>', callbackError);
      console.log('results =>', results);
      /* Samples are now collected from HealthKit */
    });
    AppleHealthKit.getBloodType(null, (err, results) => {
      if (err) {
        console.log('err', err);
        return;
      }
      console.log('getBloodType =>', results);
    });

    AppleHealthKit.getLatestHeight(null, (err, results) => {
      if (err) {
        console.log('error getting latest height: ', err);
        return;
      }
      console.log('getLatestHeight =>', results.value);
    });
  });
  // health end
  return (
    <View style={styles.container}>
      <Text>AUTO SILENT</Text>
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
