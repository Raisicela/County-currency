export interface Country {
  id: string;
  name: string;
  code: string;
}

export interface CreateCountry {
  name: string;
  code: string;
}

export interface DeleteCountry {
  id: string;
}
