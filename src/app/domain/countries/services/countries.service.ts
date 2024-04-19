import { Injectable } from '@angular/core';
import {
  Country,
  CreateCountryDTO,
  DeleteCountryDTO,
} from '../model/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor() {}

  baseUrl = 'https://p2vwh9eucb.execute-api.us-east-1.amazonaws.com/api/v1/';

  async getAllCountries(): Promise<Country[]> {
    const result = await fetch(this.baseUrl + 'countries');
    const data = await result.json();
    return data;
  }

  async createCountry(data: CreateCountryDTO) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const result = await fetch(this.baseUrl + 'countries', {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
    });
    const rta = await result.json();
    return rta;
  }

  async deleteCountry(data: DeleteCountryDTO) {
    const result = await fetch(this.baseUrl + 'countries/' + data.id, {
      method: 'DELETE',
    });
    return result;
  }

  async updateCountry(data: Country) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const result = await fetch(this.baseUrl + 'countries/' + data.id, {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(data),
    });
    const rta = await result.json();
    return rta;
  }
}
