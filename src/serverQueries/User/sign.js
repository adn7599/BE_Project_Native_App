import axios from 'axios';

import {URL} from '../config';

export async function sign(ttpToken, hash) {
  try {
    const data = JSON.stringify({hash: hash});
    const config = {
      method: 'post',
      url: `${URL.TTP}/user/sign`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ttpToken}`,
      },
      data: data,
      validateStatus: status => {
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

export async function verifySign(ttpToken, hash, sign) {
  try {
    const data = JSON.stringify({hash: hash, sign: sign});
    const config = {
      method: 'post',
      url: `${URL.TTP}/user/verifySign`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ttpToken}`,
      },
      data: data,
      validateStatus: status => {
        return [200, 400, 403, 213].includes(status);
      },
    };
    const response = await axios(config);
    return [null, {status: response.status, data: response.data}];
  } catch (err) {
    console.error(err.stack);
    return [err, null];
  }
}
