import { Injectable } from '@angular/core';
import {
  CreateCurrencyDTO,
  Currency,
  DeleteCurrencyDTO,
} from '../model/currency.model';
import { CreateCountryDTO } from '../../countries/model/country.model';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  constructor() {}

  baseUrl = 'https://p2vwh9eucb.execute-api.us-east-1.amazonaws.com/api/v1/';

  async getAll(): Promise<Currency[]> {
    const result = await fetch(this.baseUrl + 'currencies');
    const rta = result.json();
    return rta;
  }

  async createCurrency(data: CreateCurrencyDTO): Promise<Currency[]> {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const result = await fetch(this.baseUrl + 'currencies', {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
    });
    const rta = result.json();
    return rta;
  }

  async deleteCurrency(data: DeleteCurrencyDTO) {
    const result = await fetch(this.baseUrl + 'currencies' + data.id, {
      method: 'DELETE',
    });
    return result;
  }

  async updateCurrency(data: Currency): Promise<Currency[]> {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const respuesta = await fetch(this.baseUrl + 'currencies' + data.id, {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(data),
    });
    const rta = respuesta.json();
    return rta;
  }
}
