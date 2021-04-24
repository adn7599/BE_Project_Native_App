import axios from 'axios';

axios.defaults.timeout = 3000;

export const ROLE = {
  CUSTOMER: 'customer',
  SUPPLIER: 'SP',
  DISTRIBUTOR: 'DA',
};

export const URL = {
  TTP: 'https://be-project-ttp.herokuapp.com',
  RELAY: 'https://be-project-relay.herokuapp.com',
};

export const IMAGE_URL = `${URL.RELAY}/productImage`;
