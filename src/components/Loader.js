import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class Loader extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  loadingText: {
    fontSize: 36,
    color: 'white',
  },
});
