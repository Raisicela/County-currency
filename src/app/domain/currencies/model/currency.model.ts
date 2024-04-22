export interface Currency {
  id: string;
  symbol: string;
  code: string;
}

export interface CreateCurrencyDTO {
  symbol: string;
  code: string;
}

export interface DeleteCurrencyDTO {
  id: string;
}
