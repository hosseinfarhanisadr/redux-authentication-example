import Axios from 'axios';
import { getTokenFromStorage } from '../utils/auth';

const axios = Axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
  },
});

axios.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `Bearer ${getTokenFromStorage()}`,
  };
  return config;
});

export default axios;
