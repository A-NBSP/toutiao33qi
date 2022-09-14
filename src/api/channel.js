import request from '@/utils/request'
// 所有关于频道的接口
/**
 * 获取用户自己频道
 * @returns promise
 */
export const getChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
/**
 * 获取所有频道
 * @returns promise
 */
export const getAllChannelsAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}
/**
 * 删除指定用户频道
 * @param {Number|String} id 用户频道id
 * @returns Promise
 */
export const delChannelAPI = (id) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${id}`
  })
}
/**
 * 新增频道
 * @param {String|Number} id 新增频道的id
 * @param {String} seq 新增频道添加的索引值
 * @returns Promise
 */
export const addChannelAPI = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [
        {
          id,
          seq
        }
      ]
    }
  })
}
