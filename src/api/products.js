// 商品相关接口
import axios from '@/axios';

export default {
  // 获取商品列表
  getProducts(params) {
    return axios.get('/products/all', { params });
  },
  // 添加商品
  addProduct(params) {
    return axios.post('/products/add', params);
  },
  // 删除商品
  deleteProducts(params) {
    return axios.delete(`/products/${params.id}`);
  },
  // 编辑商品
  editProducts(params) {
    return axios.put('/products/edit', { params });
  },
  // 商品信息
  productInfo(params) {
    return axios.get(`/products/${params}`);
  },
};
