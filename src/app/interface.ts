export interface GeoCoords {
  lat: string;
  lng: string;
}

export interface Company {
  bs: string;
  catchPhrase: string;
  name: string;
}

export interface Address {
  city: string;
  street: string;
  zipcode: string;
  suite: string;
  geo: GeoCoords;
}

export interface User {
  address: Address;
  company: Company;
  email: string;
  id: string;
  phone: string;
  name: string;
  username: string;
  website: string;
}