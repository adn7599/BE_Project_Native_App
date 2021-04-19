import axios from 'axios';

axios.defaults.timeout = 3000;

export const ROLE = {
  CUSTOMER: 'customer',
  SUPPLIER: 'SP',
  DISTRIBUTOR: 'DA',
};

export const URL = {
  TTP: 'http://192.168.0.100:5000',
  RELAY: 'http://192.168.0.100:6000',
};
