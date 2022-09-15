import request from '@/utils/request'
/**
 * 获取联想建议
 * @param {String} q 请求的前缀词句
 * @returns Promise
 */
export const getSuggestionAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
/**
 * 获取搜索结果
 * @param {Number} page 分页的页数
 * @param {Number} per_page 每页的数量
 * @param {String} q 关键词
 * @returns
 */
export const getResultsAPI = (/*eslint-disable-line*/ page, per_page, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
