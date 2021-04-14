import axios from 'axios';

import {URL} from '../config';

export async function getOrders(relayToken, stageCompleted) {
  try {
    const config = {
      method: 'get',
      url: `${URL.RELAY}/supplier/provider/orders/${stageCompleted}`,
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

export async function getStock(relayToken) {
  try {
    const config = {
      method: 'get',
      url: `${URL.RELAY}/supplier/provider/stock`,
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

export async function postConfirm(relayToken, confirm, confirmSign) {
  try {
    const data = {
      confirm: confirm,
      confirm_sign: confirmSign,
    };
    const config = {
      method: 'post',
      url: `${URL.RELAY}/supplier/provider/confirm`,
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
