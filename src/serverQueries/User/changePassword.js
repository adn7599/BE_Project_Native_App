import axios from 'axios';

import {URL} from '../config';

export async function changePassword(ttpToken, oldPassword, newPassword) {
  try {
    const data = JSON.stringify({
      old_password: oldPassword,
      new_password: newPassword,
    });
    const config = {
      method: 'post',
      url: `${URL.TTP}/user/changePassword`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ttpToken}`,
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
