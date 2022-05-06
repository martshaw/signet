import Axios from 'axios';

const instance = Axios.create({
  responseType: 'json',
  timeout: process.env.VUE_APP_AXIOS_TIMEOUT,
  validateStatus: (status) => {
    return status < 300;
  }
});

const axios = instance;

export { axios };
