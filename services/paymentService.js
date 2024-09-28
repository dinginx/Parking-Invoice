import request from '../utils/request'

const createPayment = (parkingSessionId) => {
  return request('/payments', 'POST', { parkingSessionId })
}

const getPaymentStatus = (paymentId) => {
  return request(`/payments/${paymentId}`, 'GET')
}

const initiateWeChatPay = (paymentId) => {
  return request(`/payments/${paymentId}/wechat`, 'POST')
}

export default {
  createPayment,
  getPaymentStatus,
  initiateWeChatPay
}