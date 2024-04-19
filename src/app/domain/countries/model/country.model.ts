export interface Country {
  id: string;
  name: string;
  code: string;
}

export interface CreateCountryDTO {
  name: string;
  code: string;
}

export interface DeleteCountryDTO {
  id: string;
}
