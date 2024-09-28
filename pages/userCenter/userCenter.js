import mockService from '../../services/mockService';

Page({
  data: {
    userInfo: null
  },

  onLoad: function() {
    this.fetchUserInfo();
  },

  fetchUserInfo: function() {
    mockService.getUserInfo()
      .then(userInfo => {
        this.setData({ userInfo });
      })
      .catch(error => {
        console.error('Failed to fetch user info:', error);
        wx.showToast({
          title: '获取用户信息失败',
          icon: 'none'
        });
      });
  },

  editUserInfo: function() {
    wx.navigateTo({
      url: '/pages/editUserInfo/editUserInfo'
    });
  },

  viewParkingHistory: function() {
    wx.navigateTo({
      url: '/pages/parkingHistory/parkingHistory'
    });
  },

  contactCustomerService: function() {
    wx.makePhoneCall({
      phoneNumber: '10086' // 替换为实际的客服电话
    });
  },

  recharge: function() {
    wx.showModal({
      title: '充值',
      content: '请输入充值金额',
      editable: true,
      placeholderText: '请输入金额',
      success: (res) => {
        if (res.confirm) {
          const amount = parseFloat(res.content);
          if (isNaN(amount) || amount <= 0) {
            wx.showToast({
              title: '请输入有效金额',
              icon: 'none'
            });
            return;
          }
          // 这里应该调用实际的充值API
          this.mockRecharge(amount);
        }
      }
    });
  },

  mockRecharge: function(amount) {
    const newBalance = this.data.userInfo.balance + amount;
    this.setData({
      'userInfo.balance': newBalance
    });
    wx.showToast({
      title: '充值成功',
      icon: 'success'
    });
  },

  withdraw: function() {
    wx.showModal({
      title: '提现',
      content: '请输入提现金额',
      editable: true,
      placeholderText: '请输入金额',
      success: (res) => {
        if (res.confirm) {
          const amount = parseFloat(res.content);
          if (isNaN(amount) || amount <= 0 || amount > this.data.userInfo.balance) {
            wx.showToast({
              title: '请输入有效金额',
              icon: 'none'
            });
            return;
          }
          // 这里应该调用实际的提现API
          this.mockWithdraw(amount);
        }
      }
    });
  },

  mockWithdraw: function(amount) {
    const newBalance = this.data.userInfo.balance - amount;
    this.setData({
      'userInfo.balance': newBalance
    });
    wx.showToast({
      title: '提现申请已提交',
      icon: 'success'
    });
  },

  logout: function() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 执行退出登录操作
          wx.clearStorage();
          wx.reLaunch({
            url: '/pages/index/index'
          });
        }
      }
    });
  }
});