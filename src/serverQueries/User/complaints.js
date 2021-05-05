import axios from "axios";

import { URL } from "../config";

export async function postComplaint(
  ttpToken,
  complainee,
  transaction_id,
  subject,
  body
) {
  try {
    const data = JSON.stringify({
      complainee,
      transaction_id,
      subject,
      body,
    });
    const config = {
      method: "post",
      url: `${URL.TTP}/user/complaint`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ttpToken}`,
      },
      data: data,
      validateStatus: (status) => {
        return [200, 400, 403].includes(status);
      },
    };
    const response = await axios(config);
    return [null, { status: response.status, data: response.data }];
  } catch (err) {
    console.error(err.stack);
    return [err, null];
  }
}

export async function getComplaints(ttpToken) {
  try {
    const config = {
      method: "get",
      url: `${URL.TTP}/user/complaint`,
      headers: {
        Authorization: `Bearer ${ttpToken}`,
      },
      validateStatus: (status) => {
        return [200, 400, 403].includes(status);
      },
    };
    const response = await axios(config);
    return [null, { status: response.status, data: response.data }];
  } catch (err) {
    console.error(err.stack);
    return [err, null];
  }
}
