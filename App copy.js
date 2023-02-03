//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// create a component
const App = () => {
  Geolocation.watchPosition(
    position => {
      console.log('position', position.coords);
      if (isWithinDistance(position.coords, workplaceCoords)) {
        Vibration.vibrate([0]);
      }
    },
    error => {
      console.log(error);
    },
    {distanceFilter: 50},
  );

  return (
    <View style={styles.container}>
      <Text>App</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default App;
