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
