import axios from 'axios';

import {URL} from '../config';

export async function getProducts(relayToken) {
  try {
    const config = {
      method: 'get',
      url: `${URL.RELAY}/customer/products`,
      headers: {
        Authorization: `Bearer ${relayToken}`,
      },
      validateStatus: (status) => {
        return [200, 400, 403].includes(status);
      },
    };
    const response = await axios(config);
    return [null, {status: response.status, data: response.data}];
  } catch (err) {
    console.error(err.stack);
    return [err, null];
  }
}

export async function getCart(relayToken) {
  try {
    const config = {
      method: 'get',
      url: `${URL.RELAY}/customer/cart`,
      headers: {
        Authorization: `Bearer ${relayToken}`,
      },
      validateStatus: (status) => {
        return [200, 400, 403].includes(status);
      },
    };
    const response = await axios(config);
    return [null, {status: response.status, data: response.data}];
  } catch (err) {
    console.error(err.stack);
    return [err, null];
  }
}

export async function postCart(relayToken, product, quantity) {
  try {
    const data = {
      product: product,
      quantity: quantity,
    };
    const config = {
      method: 'post',
      url: `${URL.RELAY}/customer/cart`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${relayToken}`,
      },
      data: data,
      validateStatus: (status) => {
        return [200, 400, 403].includes(status);
      },
    };
    const response = await axios(config);
    return [null, {status: response.status, data: response.data}];
  } catch (err) {
    console.error(err.stack);
    return [err, null];
  }
}

export async function getSuppliers(
  relayToken,
  locLong,
  locLat,
  ordersArray,
  maxRange,
) {
  try {
    const data = {
      currentLocation: [locLong, locLat],
      orders: ordersArray,
      maxRange: maxRange,
    };
    const config = {
      method: 'post',
      url: `${URL.RELAY}/customer/supplier`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${relayToken}`,
      },
      data: data,
      validateStatus: (status) => {
        return [200, 400, 403].includes(status);
      },
    };
    const response = await axios(config);
    return [null, {status: response.status, data: response.data}];
  } catch (err) {
    console.error(err.stack);
    return [err, null];
  }
}

export async function postRequest(relayToken, request, requestSign) {
  try {
    const data = {
      request: request,
      request_sign: requestSign,
    };
    const config = {
      method: 'post',
      url: `${URL.RELAY}/customer/request`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${relayToken}`,
      },
      data: data,
      validateStatus: (status) => {
        return [200, 400, 403].includes(status);
      },
    };
    const response = await axios(config);
    return [null, {status: response.status, data: response.data}];
  } catch (err) {
    console.error(err.stack);
    return [err, null];
  }
}

export async function cancelRequest(relayToken, cancel, cancelSign) {
  try {
    const data = {
      cancel: cancel,
      cancel_sign: cancelSign,
    };
    const config = {
      method: 'delete',
      url: `${URL.RELAY}/customer/request`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${relayToken}`,
      },
      data: data,
      validateStatus: (status) => {
        return [200, 400, 403].includes(status);
      },
    };
    const response = await axios(config);
    return [null, {status: response.status, data: response.data}];
  } catch (err) {
    console.error(err.stack);
    return [err, null];
  }
}

export async function postPayment(relayToken, payment, paymentSign) {
  try {
    const data = {
      payment: payment,
      payment_sign: paymentSign,
    };
    const config = {
      method: 'post',
      url: `${URL.RELAY}/customer/payment`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${relayToken}`,
      },
      data: data,
      validateStatus: (status) => {
        return [200, 400, 403].includes(status);
      },
    };
    const response = await axios(config);
    return [null, {status: response.status, data: response.data}];
  } catch (err) {
    console.error(err.stack);
    return [err, null];
  }
}

export async function getOrders(relayToken, stageCompleted) {
  try {
    const config = {
      method: 'get',
      url: `${URL.RELAY}/customer/orders/${stageCompleted}`,
      headers: {
        Authorization: `Bearer ${relayToken}`,
      },
      validateStatus: (status) => {
        return [200, 400, 403].includes(status);
      },
    };
    const response = await axios(config);
    return [null, {status: response.status, data: response.data}];
  } catch (err) {
    console.error(err.stack);
    return [err, null];
  }
}
