import React, { Component } from 'react';
import moment from 'moment';
import { getCountryDataByID } from '../api';
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
      <div className="country">
        <h3>Country Name: {title}</h3>
        <h5 className="country__status">Status: {status}</h5>
        {
          timeseries && (
            <div className="country__timeseries">
              <Graph timeseries={timeseries} />
              <div className="edge-values">
                Min value: <span className="edge-values__data">{edgeValues.min.value}</span> in time <span className="edge-values__data">{edgeValues.min.time}</span>
              </div>
              <div className="edge-values">
                Max value: <span className="edge-values__data">{edgeValues.max.value}</span> in time <span className="edge-values__data">{edgeValues.max.time}</span>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default CountryData;
