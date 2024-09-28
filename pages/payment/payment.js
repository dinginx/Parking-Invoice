import mockService from '../../services/mockService';

Page({
  data: {
    paymentInfo: null
  },
  onLoad: function() {
    this.createPayment();
  },
  createPayment: function() {
    mockService.createPayment(1)  // 假设停车会话ID为1
      .then(paymentInfo => {
        this.setData({ paymentInfo });
      })
      .catch(error => {
        console.error('Failed to create payment:', error);
        wx.showToast({
          title: '创建支付失败',
          icon: 'none'
        });
      });
  },
  payNow: function() {
    const { id } = this.data.paymentInfo;
    wx.showLoading({ title: '正在支付' });
    mockService.getPaymentStatus(id)
      .then(result => {
        wx.hideLoading();
        if (result.status === 'success') {
          wx.showToast({ title: '支付成功' });
          wx.navigateTo({ url: '/pages/invoice/invoice' });
        } else {
          wx.showToast({
            title: '支付失败，请重试',
            icon: 'none'
          });
        }
      })
      .catch(error => {
        wx.hideLoading();
        console.error('Payment failed:', error);
        wx.showToast({
          title: '支付失败，请重试',
          icon: 'none'
        });
      });
  }
});