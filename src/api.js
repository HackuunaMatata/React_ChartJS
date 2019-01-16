const BASE_URL = 'http://localhost:3000';

export function getCountriesList() {
  return fetch(`${BASE_URL}/country-list`).then(data => data.json());
}

export function getCountryDataByID(id) {
  return fetch(`${BASE_URL}/country-data/${id}`).then(data => data.json());
}
