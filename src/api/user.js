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

/* 获取用户个人资料 */
export const getUserProfile = () => {
  return request({
    url: '/user/profile'
  })
}

/* 编辑用户照片资料 */
export const editUserPhoto = (data) => {
  return request({
    url: '/user/photo',
    method: 'patch',
    data
  })
}

/* 编辑用户个人资料 */
export const editUserInfo = (data) => {
  return request({
    url: '/user/profile',
    method: 'patch',
    data
  })
}
