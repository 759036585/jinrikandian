const USER_TOKEN = 'wo-shi-ni-lin-ge'

// 读取用户信息
export const getUser = () => {
  return JSON.parse(localStorage.getItem(USER_TOKEN) || '{}')
}

// 设置用户信息
export const setUser = (user) => {
  localStorage.setItem(USER_TOKEN, JSON.stringify(user))
}

// 删除用户信息\
export const delUser = () => {
  localStorage.removeItem(USER_TOKEN)
}
