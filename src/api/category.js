// 商品类目接口管理
import axios from '@/axios';

export default {
  getCategoryList(params) {
    return axios.get('/category/all', { params });
  },
};
