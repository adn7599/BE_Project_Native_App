import axios from 'axios';

import {URL} from './config';

export default async function getProductImage(prodId) {
  try {
    const config = {
      method: 'get',
      url: `${URL.RELAY}/productImage/${prodId}`,
      validateStatus: (status) => {
        return [200, 404, 400].includes(status);
      },
    };
    const response = await axios(config);
    return [null, {status: response.status, data: response.data}];
  } catch (err) {
    console.log(err.stack);
    return [err, null];
  }
}
