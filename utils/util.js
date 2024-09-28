// utils/util.js

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const showToast = (title, icon = 'none') => {
  wx.showToast({
    title: title,
    icon: icon,
    duration: 2000
  })
}

const showLoading = (title = '加载中') => {
  wx.showLoading({
    title: title,
    mask: true
  })
}

const hideLoading = () => {
  wx.hideLoading()
}

const showModal = (title, content, showCancel = true) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: title,
      content: content,
      showCancel: showCancel,
      success: (res) => {
        if (res.confirm) {
          resolve(true)
        } else if (res.cancel) {
          resolve(false)
        }
      },
      fail: reject
    })
  })
}

const calculateParkingFee = (startTime, endTime, hourlyRate) => {
  const start = new Date(startTime)
  const end = new Date(endTime)
  const durationHours = (end - start) / (1000 * 60 * 60)
  return Math.ceil(durationHours) * hourlyRate
}

const validateCarNumber = (carNumber) => {
  // 简单的车牌号验证，可根据实际需求修改
  const regex = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
  return regex.test(carNumber)
}

module.exports = {
  formatTime,
  showToast,
  showLoading,
  hideLoading,
  showModal,
  calculateParkingFee,
  validateCarNumber
}