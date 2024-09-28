// utils/request.js

const app = getApp()

const request = (url, method = 'GET', data = {}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${app.globalData.baseUrl}${url}`,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${wx.getStorageSync('token')}`
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else if (res.statusCode === 401) {
          // Token 过期，需要重新登录
          app.logout()
          reject(new Error('登录已过期，请重新登录'))
        } else {
          reject(new Error(res.data.message || '请求失败'))
        }
      },
      fail: (err) => {
        reject(new Error('网络错误，请稍后重试'))
      }
    })
  })
}

const get = (url, params = {}) => {
  return request(url, 'GET', params)
}

const post = (url, data = {}) => {
  return request(url, 'POST', data)
}

const put = (url, data = {}) => {
  return request(url, 'PUT', data)
}

const del = (url, params = {}) => {
  return request(url, 'DELETE', params)
}

module.exports = {
  get,
  post,
  put,
  delete: del
}