import React, { Component } from 'react';
import { getCountryDataByID } from '../api';
import './CountryData.scss';

class CountryData extends Component {
  state = {
    data: {
      status: null,
      timeseries: null
    }
  };

  componentDidMount() {
    if (!this.props.id) return;
    getCountryDataByID(this.props.id).then(data => {
      data.timeseries.sort((first, second) => first[1] - second[1]);
      this.setState({ data });
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id === this.props.id) return;
    getCountryDataByID(this.props.id).then(data => {
      data.timeseries.sort((first, second) => first[1] - second[1]);
      this.setState({ data });
    })
  }

  render() {
    const { title } = this.props;
    const { status, timeseries } = this.state.data;
    // TODO: add graph and function for sorting and finding values
    return (
      <div>
        <h4>Country Name: {title}</h4>
        <h5>Status: {status}</h5>
        {
          timeseries && (
            <div>
              <div>Min value: {timeseries[0][1]} in time {timeseries[0][0]}</div>
              <div>Max value: {timeseries[timeseries.length - 1][1]} in time {timeseries[timeseries.length - 1][0]}</div>
            </div>
          )
        }
      </div>
    );
  }
}

export default CountryData;
