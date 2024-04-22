export interface Format {
  id: string;
  currencyId: string;
  countryId: string;
  currencyType: string;
  currencyPosition: string;
  cents: boolean;
  allFormat: string;
}

export interface CreateFormatDTO {
  currencyId: string;
  countryId: string;
  currencyType: string;
  currencyPosition: string;
  cents: boolean;
  allFormat: string;
}

export interface DeleteFormatDTO {
  id: string;
}
