// app.js
import mockService from './services/mockService';

App({
  globalData: {
    userInfo: null,
    isLoggedIn: false,
    currentParking: null,
    baseUrl: 'https://your-api-domain.com',
    isDebug: true // 设置为 true 使用模拟数据，false 使用真实 API
  },

  onLaunch: function() {
    this.checkLoginStatus();
    this.getLocation();
  },

  checkLoginStatus: function() {
    const token = wx.getStorageSync('token');
    if (token) {
      this.globalData.isLoggedIn = true;
      this.getUserInfo();
    }
  },

  getUserInfo: function() {
    if (this.globalData.isDebug) {
      mockService.getUserInfo()
        .then(userInfo => {
          this.globalData.userInfo = userInfo;
        })
        .catch(error => {
          console.error('Failed to get user info:', error);
        });
    } else {
      // 调用真实 API 获取用户信息
    }
  },

  getLocation: function() {
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        const latitude = res.latitude;
        const longitude = res.longitude;
        this.getNearbyParkingLots(latitude, longitude);
      },
      fail: () => {
        wx.showToast({
          title: '获取位置信息失败',
          icon: 'none'
        });
      }
    });
  },

  getNearbyParkingLots: function(latitude, longitude) {
    if (this.globalData.isDebug) {
      mockService.getParkingLots()
        .then(parkingLots => {
          // 处理获取到的停车场数据
          console.log('Nearby parking lots:', parkingLots);
        });
    } else {
      // 调用真实 API 获取附近停车场
    }
  },

  login: function(callback) {
    wx.login({
      success: res => {
        if (this.globalData.isDebug) {
          // 模拟登录过程
          setTimeout(() => {
            this.globalData.isLoggedIn = true;
            wx.setStorageSync('token', 'mock_token');
            this.getUserInfo();
            callback && callback(true);
          }, 1000);
        } else {
          // 调用真实登录 API
        }
      },
      fail: () => {
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        });
        callback && callback(false);
      }
    });
  },

  logout: function() {
    this.globalData.isLoggedIn = false;
    this.globalData.userInfo = null;
    wx.removeStorageSync('token');
    wx.reLaunch({
      url: '/pages/index/index'
    });
  },

  showError: function(message) {
    wx.showToast({
      title: message,
      icon: 'none',
      duration: 2000
    });
  }
});