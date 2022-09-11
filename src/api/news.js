import request from '@/utils/request'
/**
 * 获取文章
 * @param {String} id 频道的id
 * @param {Number} timestamp 请求推荐数据当前的事件戳
 * @returns promise
 */
export const getArticles = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}
