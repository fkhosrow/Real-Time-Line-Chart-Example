import React, { Component } from 'react';
import { StyleSheet, processColor } from 'react-native';

import { LineChart } from 'react-native-charts-wrapper';

export default class LiveUpdating extends Component {

  constructor(props) {
    super(props);
    this.state = {
      values: [0]
    }
  }

  next(values) {
    return {
      data: {
        dataSets: [{
          values: values,
          label: '', // required

          config: {
            drawValues: false,
            color: processColor('black'),
            drawCircles: false,
            lineWidth: 1,
            mode: "CUBIC_BEZIER"
          }
        }]
      },
      legend: {
        enabled: false
      },
      xAxis: {
        drawLabels: false,
        drawGridLines: false,
        drawAxisLines: false
      },
      yAxis: {
          left: {
            enabled: false
          },
          right: {
            enabled: false
          }
      }
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      // Refresh after 100 points
      if (this.state.values.length >= 100) {
        // https://github.com/PhilJay/MPAndroidChart/issues/2450
        // MpAndroidChart 3.0.2 will crash when data entry list is empty.

        this.setState({values: [0]});
      } 
      else {
        this.setState({
          values: this.state.values.concat([Math.floor((Math.random() * 100) + 1)])
        });
      }
    }, 50);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {values} = this.state;
    const config = this.next(values);
    return (
      <LineChart 
        chartDescription={{ text: '' }} 
        data={config.data} 
        legend={config.legend}
        xAxis={config.xAxis} 
        yAxis={config.yAxis} 
        style={styles.container} 
        >
        </LineChart>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  }
});