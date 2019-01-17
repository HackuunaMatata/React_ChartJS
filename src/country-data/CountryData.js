import React, { Component } from 'react';
import { getCountryDataByID } from '../api';
import moment from 'moment';
import Graph from '../graph/Graph';
import './CountryData.scss';

class CountryData extends Component {
  state = {
    status: null,
    timeseries: null,
    edgeValues: null
  };

  componentDidMount() {
    if (!this.props.id) return;
    getCountryDataByID(this.props.id).then(({ status, timeseries }) => {
      const edgeValues = this.findEdgeValues(timeseries);

      this.setState({ status, timeseries, edgeValues });
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id === this.props.id) return;
    getCountryDataByID(this.props.id).then(({ status, timeseries }) => {
      const edgeValues = this.findEdgeValues(timeseries);

      this.setState({ status, timeseries, edgeValues });
    })
  }

  findEdgeValues(timeseries) {
    let min = timeseries[0];
    let max = timeseries[0];
    const defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    const newFormat = 'MMM D YYYY, h:mm:ss a (Z UTC)';

    timeseries.forEach(elem => {
      if (elem[1] < min[1]) min = elem;
      if (elem[1] > max[1]) max = elem;
    });

    return {
      min: {
        value: min[1],
        time: moment(min[0], defaultFormat).format(newFormat)
      },
      max: {
        value: max[1],
        time: moment(max[0], defaultFormat).format(newFormat)
      }
    };
  }

  render() {
    const { title } = this.props;
    const { status, timeseries, edgeValues } = this.state;

    return (
      <div>
        <h4>Country Name: {title}</h4>
        <h5>Status: {status}</h5>
        {
          timeseries && (
            <div>
              <Graph timeseries={timeseries} />
              <div>
                Min value: {edgeValues.min.value} in time {edgeValues.min.time}
              </div>
              <div>
                Max value: {edgeValues.max.value} in time {edgeValues.max.time}
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default CountryData;
