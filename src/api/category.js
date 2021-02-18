// 商品类目接口管理
import axios from '@/axios';

export default {
  // 获取商品类目
  getCategoryList(params) {
    return axios.get('/category/all', { params });
  },
};
