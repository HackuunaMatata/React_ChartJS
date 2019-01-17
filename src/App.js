import React, { Component } from 'react';
import './App.scss';
import CountriesList from './countries-list/CountriesList';
import CountryData from './country-data/CountryData';

class App extends Component {
  state = {
    countryID: null,
    countryName: null
  };

  changeCountryID(country) {
    if (this.state.countryID === country.id) return;
    this.setState({ countryID: country.id, countryName: country.title })
  }

  render() {
    return (
      <div className="app">
        <nav className="app__navigation">
          <CountriesList onChooseCountry={this.changeCountryID.bind(this)} />
        </nav>
        <main className="app__data-container">
          {
            this.state.countryID ? (
              <CountryData id={this.state.countryID} title={this.state.countryName} />
            ) : (
              <h3 className="info">Please, select any country</h3>
            )
          }
        </main>
      </div>
    );
  }
}

export default App;
