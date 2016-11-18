/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native';
import Canvas from './components/Canvas';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

function renderCanvas(e) {
  console.log(e);
}

export default class nativesnake extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Canvas
          onLoad={renderCanvas}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('nativesnake', () => nativesnake);
