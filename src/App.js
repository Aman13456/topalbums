/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import Home from './components/Home';
import store from './redux/store';

class App extends React.Component {
  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={{flex: 1}}>
          <Provider store={store}>
            <Home />
          </Provider>
        </SafeAreaView>
      </>
    );
  }
}

export default App;
