import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Shimmer from 'react-native-shimmer';

export default class Loader extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Shimmer>
          <Text style={styles.loadingText}>Loading...</Text>
        </Shimmer>
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
    color: "white"
  },
});
