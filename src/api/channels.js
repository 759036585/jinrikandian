// 专门处理频道的请求
import requset from '../utils/request'

// 获取我的频道
export const getMyChannels = () => {
  return requset({
    url: '/user/channels'
  })
}
