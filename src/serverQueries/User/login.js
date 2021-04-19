import axios from 'axios';
import {URL} from '../config';

async function loginTTP(role, reg_id, password) {
  try {
    const data = JSON.stringify({
      role: role,
      reg_id: reg_id,
      password: password,
    });
    const config = {
      method: 'post',
      url: `${URL.TTP}/user/login`,
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
    return [err, null];
  }
}

async function loginRelay(role, reg_id, password) {
  try {
    const data = JSON.stringify({
      role: role,
      reg_id: reg_id,
      password: password,
    });
    const config = {
      method: 'post',
      url: `${URL.RELAY}/login`,
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
    return [err, null];
  }
}

export default async function login(role, reg_id, password) {
  //Return value
  // [errMsg,ttpToken,relayToken]
  //first logging in to TTP
  const [ttpError, respTTP] = await loginTTP(role, reg_id, password);
  if (ttpError == null) {
    if (respTTP.status == 200) {
      //login successful, received token
      console.log('TTP Server => ', respTTP.data);

      //extracting ttpToken and relayPass
      const ttpToken = respTTP.data.token;
      const relayPass = respTTP.data.relay_password;

      //Now logging in to Relay Server
      const [relayErr, respRelay] = await loginRelay(role, reg_id, relayPass);
      if (relayErr == null) {
        if (respRelay.status == 200) {
          //login successful received token
          console.log('Relay Server => ', respRelay.data);

          //extracting relayToken
          const relayToken = respRelay.data.token;

          return [null, ttpToken, relayToken];
        } else {
          //Relay 400
          //status code 400, something wrong
          console.error('Relay Server => ', respRelay.data);
          return [respRelay.data.error, null, null];
        }
      } else {
        console.error('Relay Server =>', relayErr);
        return [relayErr, null, null];
      }
    } else {
      //TTP 400
      //status code 400, something wrong
      console.error('TTP Server => ', respTTP.data);
      return [respTTP.data.error, null, null];
    }
  } else {
    console.error('TTP Server =>', ttpError);
    return [ttpError, null, null];
  }
}

export async function getUserDetails(ttpToken) {
  try {
    const config = {
      method: 'get',
      url: `${URL.TTP}/user/details`,
      headers: {Authorization: `Bearer ${ttpToken}`},
      validateStatus: (status) => {
        return [200, 400, 403].includes(status);
      },
    };
    console.log('config: ', config);
    const response = await axios(config);
    return [null, {status: response.status, data: response.data}];
  } catch (err) {
    return [err, null];
  }
}
