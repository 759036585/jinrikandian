// 用于获取文章数据
import request from '../utils/request'

/**
 * 获取推荐文章的数据
 * axios中 query 参数放置在params上
 * body参数放置在 data上
 * */
export const getArticles = (params) => {
  return request({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params: { with_top: 1, ...params }
  })
}

/**
 * 更多操作不感兴趣接口
 *
 * 不喜欢文章接口
 * */
export const disLikeArticle = (data) => {
  return request({
    url: '/article/dislikes',
    method: 'post',
    data
  })
}

/**
 * 举报文章接口
 * */

export const reportArticle = (data) => {
  return request({
    url: '/article/reports',
    method: 'post',
    data
  })
}
/**
 *
 * 获取文章搜索的建议
 * */
export const suggestion = (params) => {
  return request({
    url: '/suggestion',
    params
  })
}

/***
 *
 * 获取文章搜索结果
 * params是get参数
 * data是body参数
 */
export const searchArticle = (params) => {
  return request({
    url: '/search',
    params
  })
}

/***
 *
 * 获取文章详情
 */
export const getArticleInfo = (id) => {
  return request({
    url: `/articles/${id}`
  })
}

/***
 * 获取评论
 */
export const getComments = (params) => {
  return request({
    url: '/comments',
    params
  })
}
