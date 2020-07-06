import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export default class Retry extends React.Component {
  retryFetchData = () => {
    this.props.fetchData();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.retryText}>
          Could not fetch the albums. Please try again by clicking the button
          below.
        </Text>
        <TouchableOpacity style={styles.button} onPress={this.retryFetchData}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Retry.propTypes = {
  fetchData: PropTypes.func.isRequired,
};

Retry.defaultProps = {
  fetchData: () => {},
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
  },
  retryText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});
