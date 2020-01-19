import axios from 'axios'
import JSONBig from 'json-bigint'
import store from '../store/index'

// 创建一个axios实例 和原来的axios没有关系
const instance = axios.create({
  // 设置请求地址常量
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0',
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }
  }]
})

instance.interceptors.request.use(function (config) {
  if (store.state.user.token) {
    config.headers.authorization = `Bearer ${store.state.user.token}`
  }
  return config
})

instance.interceptors.response.use(function (response) {
  // 响应数据 返回得到的响应数据 第一层data是axios 默认包data，第二个data是接口返回里面的包的data
  try {
    return response.data.data
  } catch (error) {
    return response.data
  }
}, function (error) {
  // 错误的时候token容易失效
  return Promise.reject(error)
})

export default instance
