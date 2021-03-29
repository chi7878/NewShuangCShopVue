import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    path: `${process.env.VUE_APP_HTTPAPI}/api/${process.env.VUE_APP_PATHAPI}`,
    loginPath: process.env.VUE_APP_HTTPAPI,
    cookies: document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
  },
  mutations: {
  },
  actions: {
    getProductListAll({state}) {
      return axios.get(`${state.path}/products/all`);
    },
    getProductInfo({state}, id) {
      return axios.get(`${state.path}/product/${id}`);
    },
    postAddCart({state}, data) {
      const postData = {data};
      return axios.post(`${state.path}/cart`, postData);
    },
    getCart({state}) {
      return axios.get(`${state.path}/cart`);
    },
    postCoupon({state},coupon) {
      const data = {data : {code: coupon}};
      return axios.post(`${state.path}/coupon`, data);
    },
    deleteCart({state},id) {
      return axios.delete(`${state.path}/cart/${id}`);
    },
    postAddOrder({state},data) {
      return axios.post(`${state.path}/order`, {data})
    },
    postInnerLogin({state}, data) {
      return axios.post(`${state.loginPath}/admin/signin`, data)
    },
    postInnerLogout({state}, data) {
      return axios.post(`${state.loginPath}/logout`, data)
    },
    getInnerProduct({state}) {
      return axios.get(`${state.path}/admin/products/all`, {headers: {Authorization : state.cookies}});
    },
    getInnerOrder({state}) {
      return axios.get(`${state.path}/admin/orders`, {headers: {Authorization : state.cookies}});
    },
    postUploadImg({state}, file) {
      const data = new FormData();
      data.append('file-to-upload', file);
      return axios.post(`${state.path}/admin/upload`, data, {headers: {Authorization : state.cookies}});
    },
    postAddProduct({state}, data) {
      return axios.post(`${state.path}/admin/product`, {data}, {headers: {Authorization : state.cookies}});
    },
    deleteProduct({state}, id) {
      return axios.delete(`${state.path}/admin/product/${id}`, {headers: {Authorization : state.cookies}});
    },
    putEditProduct({state}, data) {
      return axios.put(`${state.path}/admin/product/${data.id}`, {data: data.data}, {headers: {Authorization : state.cookies}});
    },
    getCoupon({state}, page) {
      return axios.get(`${state.path}/admin/coupons`,{params: {page},headers: {Authorization : state.cookies}});
    },
    postAddCoupon({state}, data) {
      return axios.post(`${state.path}/admin/coupon`, {data}, {headers: {Authorization : state.cookies}});
    },
    putEditCoupon({state}, data) {
      return axios.put(`${state.path}/admin/coupon/${data.id}`, {data: data.data}, {headers: {Authorization : state.cookies}});
    },
    deleteCoupon({state}, id) {
      return axios.delete(`${state.path}/admin/coupon/${id}`, {headers: {Authorization : state.cookies}});
    }
  }
})
