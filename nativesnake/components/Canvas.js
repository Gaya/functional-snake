import React, { PropTypes } from 'react';
import {
  View,
  WebView,
} from 'react-native';

const Canvas = ({ onLoad = () => {} }) => (
  <View>
    <WebView
      automaticallyAdjustContentInsets={false}
      contentInset={{ top: 0, right: 0, bottom: 0, left: 0 }}
      javaScriptEnabled
      source={{ html: '<canvas id="canvas"></canvas>' }}
      onLoadStart={onLoad}
      opaque={false}
      underlayColor={'transparent'}
    />
  </View>
);

Canvas.propTypes = {
  onLoad: PropTypes.func,
};

module.exports = Canvas;
