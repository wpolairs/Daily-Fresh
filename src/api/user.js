// 对于用户管理的接口
import axios from '@/axios';

export default {
  // 登录
  login(params) {
    return axios.post('/passport/login', params);
  },
  // 注册
  register(params) {
    return axios.post('/passport/logon', params);
  },
  // 找回密码
  findBack(params) {
    return axios.post('/passport/findBack', params);
  },
  // 修改用户信息
  changeUserInfo(params) {
    return axios.put('/passport/changeUserInfo', params);
  },
  // 获取验证码
  getCode(params) {
    return axios.post('/passport/getCode', params);
  },
};
