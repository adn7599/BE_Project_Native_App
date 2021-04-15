import * as supp from './supplier';
import * as dist from './distributor';

export const suppProvQueries = {
  getOrders: supp.getOrders,
  getStock: supp.getStock,
  confirm: supp.confirm,
};

export const distProvQueries = {
  getOrders: dist.getOrders,
  getStock: dist.getStock,
  confirm: dist.confirm,
};
