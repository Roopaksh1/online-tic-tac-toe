import axios from "axios";
export const API_CLIENT = {
  get(URL) {
    const promise = axios.get(URL, { timeout: 7000 });
    return promise;
  },
  post(URL, data) {
    return axios.post(URL, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
