import React, { Component } from 'react';
import Chart from 'chart.js';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.lineChart = null;
    this.chartData = [];
  }

  sortByTimeseriesDate(timeseries) {
    timeseries.sort();
  }

  configChartData(timeseries) {
    return timeseries.map(elem => ({
      x: elem[0],
      y: elem[1]
    }))
  }

  configChartOptions() {
    return {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 80,
          fontColor: 'black'
        }
      },
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'month',
            unitStepSize: 2,
            tooltipFormat: 'MMM D YYYY, h:mm:ss a (Z UTC)',
            displayFormats: {
              month: 'MMM YYYY'
            }
          },
          scaleLabel: {
            display: true,
            labelString: 'Time'
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            stepSize: 10
          },
          scaleLabel: {
            display: true,
            labelString: 'Value'
          }
        }]
      }
    }
  }

  prepareData() {
    this.sortByTimeseriesDate(this.props.timeseries);
    this.chartData = this.configChartData(this.props.timeseries);
    this.chartOptions = this.configChartOptions();
  }

  componentDidMount() {
    this.prepareData();
    this.lineChart = new Chart(this.chartRef.current.getContext('2d'), {
      type: 'line',
      data: {
        datasets: [{
          label: 'Value in Time',
          data: this.chartData,
          borderColor: 'blue',
          backgroundColor: 'transparent',
          pointRadius: 5,
          pointHoverRadius: 10,
          pointStyle: 'rectRounded'
        }]
      },
      options: this.chartOptions
    });
  }

  componentWillUnmount() {
    this.lineChart.destroy();
  }

  componentDidUpdate() {
    this.prepareData();
    this.lineChart.data.datasets[0].data = this.chartData;
    this.lineChart.update();
  }

  render() {
    return (
      <div>
        <canvas ref={this.chartRef} width="1700" height="500" />
      </div>
    );
  }
}

export default Graph;
