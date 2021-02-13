// 商品相关接口
import axios from '@/axios';

export default {
  /**
     * 获取商品列表
     * @param {Object} params
     */
  getProducts(params) {
    return axios.get('/products/all', { params });
  },
};
