import axios from 'axios'
import JSONBig from 'json-bigint'
import store from '../store/index'
import router from '../router/index'

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
}, async function (error) {
  let toPath = { path: '/login', query: { redirectUrl: router.currentRoute.fullPath } } // 跳转对象
  // 错误的时候token容易失效
  if (error.response && error.response.status === 401) {
    try {
      // 表示token过期 先判断 是否有refresh_token
      // 这里不应该再用instance 因为instance 会再次进入拦截器 用默认的axios
      let result = await axios({
        method: 'put',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${store.state.user.token}`
        }
      })
      store.commit('updateUser', {
        user: {
          token: result.data.data.token, // 拿到token之后
          refresh_token: store.state.user.refresh_token
        }
      })
      return instance(error.config) // 把刚才错误的请求再次发送出去 然后将promise返回
    } catch (error) {
      // 如果错误 表示补救措施也没用了 应该跳转到登录页 并且 把废掉的user全部干掉
      store.commit('clearUser') // 所有的用户信息清空
      router.push(toPath) // 跳回到登录页
    }
  } else {
    router.push(toPath)
  }
  return Promise.reject(error)
})

export default instance
