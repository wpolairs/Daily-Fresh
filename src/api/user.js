// 对于用户管理的接口
import axios from '@/axios';

export default {
  login(params) {
    return axios.post('/passport/login', params);
  },
};
