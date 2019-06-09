import React, { View } from 'react';
import {
  AppRegistry
} from 'react-native';

import LiveUpdating from './LineChartScreen';

class App extends React.Component {
  render() {
    return (
        <LiveUpdating>
        </LiveUpdating>
    );
  }
}

export default App;

AppRegistry.registerComponent('App', () => App);