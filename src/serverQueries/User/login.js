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
      validateStatus: status => {
        return [200, 400].includes(status);
      },
    };
    const response = await axios(config);
    return {status: response.status, data: response.data};
  } catch (err) {
    throw err;
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
      validateStatus: status => {
        return [200, 400].includes(status);
      },
    };
    const response = await axios(config);
    return null, {status: response.status, data: response.data};
  } catch (err) {
    throw err;
  }
}

export async function login(role, reg_id, password) {
  //Return value
  // [errMsg,ttpToken,relayToken]
  try {
    //first logging in to TTP
    const respTTP = await loginTTP(role, reg_id, password);

    if (respTTP.status == 200) {
      //login successful, received token
      console.log('TTP Server => ', respTTP.data);

      //extracting ttpToken and relayPass
      const ttpToken = respTTP.data.token;
      const relayPass = respTTP.data.relay_password;

      //Now logging in to Relay Server
      const respRelay = await loginRelay(role, reg_id, relayPass);

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
      //TTP 400
      //status code 400, something wrong
      console.error('TTP Server => ', respTTP.data);
      return [respTTP.data.error, null, null];
    }
  } catch (err) {
    return ['Server Error', null, null];
  }
}
