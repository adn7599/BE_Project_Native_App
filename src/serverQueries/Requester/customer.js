import axios from 'axios';
import {sha256} from 'react-native-sha256';

import {URL} from '../config';
import {sign} from '../User/sign';

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

async function postRequest(relayToken, request, requestSign) {
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

async function cancelRequest(relayToken, cancel, cancelSign) {
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

async function postPayment(relayToken, payment, paymentSign) {
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

//aggregated queries
export async function request(
  ttpToken,
  relaytoken,
  requester_id,
  provider_id,
  ordersArray,
  payment_amount,
) {
  try {
    //constructing request object
    const request = {
      requester_id,
      provider_id,
      time: new Date(),
      orders: ordersArray,
      payment_amount,
    };

    //Need to calculate to hash before signing
    const requestObjStr = JSON.stringify(request);
    console.log('Request Obj string: ', requestObjStr);
    //caculating hash
    const requestHash = await sha256(requestObjStr);
    console.log('Request Obj string hash: ', requestHash);

    //signing the hash
    const [signErr, signResp] = await sign(ttpToken, requestHash);

    if (signErr) {
      //Error while signing
      return [signErr, null];
    } else {
      if (signResp.status == 200) {
        //response OK
        //got sign can continue
        const requestSign = signResp.data.sign;
        console.log('requestSign: ', requestSign);
        //Sending the request
        const [reqErr, reqResp] = await postRequest(
          relaytoken,
          request,
          requestSign,
        );

        return [reqErr, reqResp];
      } else {
        //unsuccesfull
        return [null, signResp];
      }
    }
  } catch (err) {
    return [err, null];
  }
}

export async function cancel() {}

export async function payment() {}
