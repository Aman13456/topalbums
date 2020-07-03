import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class NoInternet extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.noInternetText}>
          Oops! Looks like you are not connected to Internet.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
  },
  noInternetText: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
  },
});
