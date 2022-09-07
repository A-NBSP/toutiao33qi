import request from '@/utils/request'
/**
 * 登录
 * @param {String} mobile 手机号
 * @param {Number} code 验证码
 * @returns promise
 */
export const login = (mobile, code) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}
/**
 * 发送验证码
 * @param {String} mobile 手机号
 * @returns promise
 */
export const sendCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
