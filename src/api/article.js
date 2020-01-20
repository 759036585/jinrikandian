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
