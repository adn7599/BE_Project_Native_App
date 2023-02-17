import axios from 'axios';

axios.defaults.timeout = 3000;

export const ROLE = {
  CUSTOMER: 'customer',
  SUPPLIER: 'SP',
  DISTRIBUTOR: 'DA',
};

export const URL = {
  TTP: 'https://bewildered-puce-crayfish.cyclic.app',
  RELAY: 'https://sore-gold-walkingstick-kit.cyclic.app',
};

export const IMAGE_URL = `${URL.RELAY}/productImage`;
