import axios from 'axios';

import {URL} from '../config';

export async function accountVerify(role, reg_id) {
  try {
    const data = JSON.stringify({role: role, reg_id: reg_id});
    const config = {
      method: 'post',
      url: `${URL.TTP}/user/register/accountVerify`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
      validateStatus: (status) => {
        return [200, 400].includes(status);
      },
    };
    const response = await axios(config);
    return [null, {status: response.status, data: response.data}];
  } catch (err) {
    console.log('register ' ,err);
    return [err, null];
  }
}

export async function sendOTP(role, reg_id) {
  try {
    const data = JSON.stringify({role: role, reg_id: reg_id});
    const config = {
      method: 'post',
      url: `${URL.TTP}/user/register/sendOTP`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
      validateStatus: (status) => {
        return [200, 400].includes(status);
      },
    };
    const response = await axios(config);
    return [null, {status: response.status, data: response.data}];
  } catch (err) {
    console.log(err.stack);
    return [err, null];
  }
}

export async function verifyOTP(role, reg_id, otp, token) {
  try {
    const data = JSON.stringify({
      role: role,
      reg_id: reg_id,
      otp: otp,
      token: token,
    });
    const config = {
      method: 'post',
      url: `${URL.TTP}/user/register/verifyOTP`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
      validateStatus: (status) => {
        return [200, 400].includes(status);
      },
    };
    const response = await axios(config);
    return [null, {status: response.status, data: response.data}];
  } catch (err) {
    console.log(err.stack);
    return [err, null];
  }
}

export async function accountRegister(role, reg_id, password, token) {
  try {
    const data = JSON.stringify({
      role: role,
      reg_id: reg_id,
      password: password,
      token: token,
    });
    const config = {
      method: 'post',
      url: `${URL.TTP}/user/register/accountRegister`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
      validateStatus: (status) => {
        return [200, 400].includes(status);
      },
    };
    const response = await axios(config);
    return [null, {status: response.status, data: response.data}];
  } catch (err) {
    console.log(err.stack);
    return [err, null];
  }
}
