import mockService from '../../services/mockService';

Page({
  data: {
    parkingLots: []
  },
  onLoad: function() {
    this.fetchParkingLots();
  },
  fetchParkingLots: function() {
    mockService.getParkingLots()
      .then(parkingLots => {
        this.setData({ parkingLots });
      })
      .catch(error => {
        console.error('Failed to fetch parking lots:', error);
        wx.showToast({
          title: '获取停车场列表失败',
          icon: 'none'
        });
      });
  },
  goToParkingDetail: function(e) {
    const parkingId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/parkingDetail/parkingDetail?id=${parkingId}`
    });
  }
});