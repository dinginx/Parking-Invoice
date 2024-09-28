import mockService from '../../services/mockService';

Page({
  data: {
    parkingInfo: null
  },
  onLoad: function(options) {
    const parkingId = options.id;
    this.fetchParkingInfo(parkingId);
  },
  fetchParkingInfo: function(id) {
    mockService.getParkingDetail(id)
      .then(parkingInfo => {
        this.setData({ parkingInfo });
      })
      .catch(error => {
        console.error('Failed to fetch parking details:', error);
        wx.showToast({
          title: '获取停车场详情失败',
          icon: 'none'
        });
      });
  },
  startParking: function() {
    const { id } = this.data.parkingInfo;
    wx.showLoading({ title: '正在开始停车' });
    mockService.startParking(id, 'TEST123')  // 假设车牌号
      .then(() => {
        wx.hideLoading();
        wx.showToast({ title: '停车开始' });
        wx.navigateTo({ url: '/pages/payment/payment' });
      })
      .catch(error => {
        wx.hideLoading();
        console.error('Failed to start parking:', error);
        wx.showToast({
          title: '开始停车失败',
          icon: 'none'
        });
      });
  }
});