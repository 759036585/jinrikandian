import request from '../utils/request'

// 封装用户登录接口
export const login = (data) => {
  return request({
    url: '/authorizations',
    method: 'post',
    data
  })
}

// 关注用户
export const followUser = (data) => {
  return request({
    url: '/user/followings',
    method: 'post',
    data
  })
}

// 取消关注
export const unFollowUser = (target) => {
  return request({
    url: `/user/followings/${target}`,
    method: 'delete'
  })
}

/** ****** 获取用户个人信息 **********/
export const getUserInfo = () => {
  return request({
    url: '/user'
  })
}
