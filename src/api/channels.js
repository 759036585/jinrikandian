import store from '../store/index'

// 专门处理频道的请求
import requset from '../utils/request'

// 本地缓存 需要key
const CACHE_CHANNEL_T = 'hm-91-toutiao-t' // 游客缓存的key
const CACHE_CHANNEL_U = 'hm-91-toutiao-u' // 登录用户的key

/***
 * 获取我的频道
 */

// 获取我的频道
export const getMyChannels = () => {
  // 返回一个Promise axios默认就是get类型
  // 首先我们应该 先从缓存中读取 看看缓存中有没有 如果缓存中有的话 用缓存的数据 如果缓存中没有 才去查询
  return new Promise(async function (resolve, reject) {
    let key = store.state.user.token ? CACHE_CHANNEL_U : CACHE_CHANNEL_T // 用于缓存的key
    // 从缓存中读取数据
    let str = localStorage.getItem(key) // 得到缓存的结果
    if (str) {
      // 如果str存在 表示缓存中有数据
      resolve({ channels: JSON.parse(str) }) // 表示从缓存中获取的数据 通过执行链下发给下一个Promise
    } else {
      // 如果没有数据
      const data = await requset({ url: '/user/channels' }) // 从线上拉取数据
      localStorage.setItem(key, JSON.stringify(data.channels)) // 将线上数据写入缓存
      resolve(data) // 将线上获取的数据释放给Promise
    }
  })
  // return requset({
  //   url: '/user/channels'
  // })
}

// 获取所有频道
export const getAllChannels = () => {
  return requset({
    url: '/channels'
  })
}
