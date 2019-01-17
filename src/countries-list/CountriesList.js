import React, { Component } from 'react';
import { getCountriesList } from '../api';
import './CountriesList.scss';

class CountriesList extends Component {
  state = {
    countries: null
  };

  componentDidMount() {
    getCountriesList().then(countriesList => {
      this.setState({ countries: countriesList });
    })
  }

  render() {
    const { countries } = this.state;
    return (
      <div className="menu">
        <h3>Countries List</h3>
        <ul className="countries-list">
          {
            countries && countries.map(country => (
              <li
                key={country.id}
                onClick={() => this.props.onChooseCountry(country)}
                className="countries-list__item"
              >
                {country.title}
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default CountriesList;
