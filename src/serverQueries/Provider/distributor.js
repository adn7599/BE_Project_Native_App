import axios from 'axios';

import {URL} from '../config';

import {sha256} from 'react-native-sha256';
import {sign} from '../User/sign';

export async function getOrders(relayToken, stageCompleted) {
  try {
    const config = {
      method: 'get',
      url: `${URL.RELAY}/distributor/orders/${stageCompleted}`,
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
      url: `${URL.RELAY}/distributor/stock`,
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

async function postConfirm(relayToken, confirm, confirmSign) {
  try {
    const data = {
      confirm: confirm,
      confirm_sign: confirmSign,
    };
    const config = {
      method: 'post',
      url: `${URL.RELAY}/distributor/confirm`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${relayToken}`,
      },
      data: data,
      validateStatus: (status) => {
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

export async function confirm(
  ttpToken,
  relaytoken,
  transaction_id,
  requester_token,
  provider_token,
) {
  try {
    //constructing confirm object
    const confirm = {
      transaction_id,
      time: new Date(),
      requester_token,
      provider_token,
    };

    //Need to calculate the hash before signing
    const confirmObjStr = JSON.stringify(confirm);
    console.log('Confirm Obj string: ', confirmObjStr);
    //caculating hash
    const confirmHash = await sha256(confirmObjStr);
    console.log('Confirm Obj string hash: ', confirmHash);

    //signing the hash
    const [signErr, signResp] = await sign(ttpToken, confirmHash);

    if (signErr) {
      //Error while signing
      return [signErr, null];
    } else {
      if (signResp.status == 200) {
        //response OK
        //got sign can continue
        const confirmSign = signResp.data.sign;
        console.log('confirmSign: ', confirmSign);
        //Sending the confirm request
        const [confirmErr, confirmResp] = await postConfirm(
          relaytoken,
          confirm,
          confirmSign,
        );

        return [confirmErr, confirmResp];
      } else {
        //unsuccesfull
        return [null, signResp];
      }
    }
  } catch (err) {
    return [err, null];
  }
}
