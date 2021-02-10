import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});
instance.interceptors.request.use((config) => {
  console.log(config, 'config');
  return config;
}, (error) => Promise.reject(error));
instance.interceptors.response.use((response) => {
  if (response.data.status === 'fail') {
    return Promise.reject(response.data.msg);
  }
  return Promise.resolve(response.data.data);
}, (error) => Promise.reject(error));

export default instance;