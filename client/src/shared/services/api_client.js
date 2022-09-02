import axios from "axios";

export const API_CLIENT = {
  get(URL) {
    return axios.get(URL, { timeout: 7000 });
  },

  post(URL, data) {
    return axios.post(URL, data);
  },
};
