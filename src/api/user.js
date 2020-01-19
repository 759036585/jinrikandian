import request from '../utils/request'

// 封装用户登录接口
export const login = (data) => {
  return request({
    url: '/authorizations',
    method: 'post',
    data
  })
}
