import * as cust from './customer';
import * as supp from './supplier';

export const custReqQueries = {
  getProducts: cust.getProducts,
  getCart: cust.getCart,
  postCart: cust.postCart,
  getSuppliers: cust.getSuppliers,
  request: cust.request,
  cancelRequest: cust.cancel,
  postPayment: cust.payment,
  getOrders: cust.getOrders,
};
