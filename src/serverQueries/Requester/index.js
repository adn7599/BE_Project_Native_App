import * as cust from './customer';
import * as supp from './supplier';

export const custReqQueries = {
  getProducts: cust.getProducts,
  getCart: cust.getCart,
  postCart: cust.postCart,
  getSuppliers: cust.getSuppliers,
  request: cust.request,
  cancel: cust.cancel,
  payment: cust.payment,
  getOrders: cust.getOrders,
};

export const suppReqQueries = {
  getProducts: supp.getProducts,
  getCart: supp.getCart,
  postCart: supp.postCart,
  getDistributors: supp.getDistributors,
  request: supp.request,
  cancel: supp.cancel,
  payment: supp.payment,
  getOrders: supp.getOrders,
};
