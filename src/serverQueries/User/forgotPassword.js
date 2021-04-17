import axios from 'axios';

import {URL} from '../config';

export async function sendOTP(role, reg_id) {
  try {
    const data = JSON.stringify({role: role, reg_id: reg_id});
    const config = {
      method: 'post',
      url: `${URL.TTP}/user/forgotPassword/sendOTP`,
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
    console.error(err.stack);
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
      url: `${URL.TTP}/user/forgotPassword/verifyOTP`,
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
    console.error(err.stack);
    return [err, null];
  }
}

export async function resetPassword(role, reg_id, newPassword, token) {
  try {
    const data = JSON.stringify({
      role: role,
      reg_id: reg_id,
      new_password: newPassword,
      token: token,
    });
    const config = {
      method: 'post',
      url: `${URL.TTP}/user/forgotPassword/resetPassword`,
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
    console.error(err.stack);
    return [err, null];
  }
}
