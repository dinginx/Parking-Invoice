// services/mockService.js

const mockParkingLots = [
  { id: 1, name: "中央公园停车场", address: "中央大道123号", availableSpots: 50, totalSpots: 100, pricePerHour: 10 },
  { id: 2, name: "商业中心停车场", address: "商业街456号", availableSpots: 20, totalSpots: 80, pricePerHour: 15 },
  { id: 3, name: "人民广场停车场", address: "广场路789号", availableSpots: 30, totalSpots: 150, pricePerHour: 8 }
];

const mockUserInfo = {
  id: "user123",
  nickName: "停车达人",
  avatarUrl: "https://k.sinaimg.cn/n/sinakd20117/0/w800h800/20240127/889b-4c8a7876ebe98e4d619cdaf43fceea7c.jpg/w700d1q75cms.jpg",
  phoneNumber: "13800138000",
  carNumber: "沪A12345"
};

const mockInvoices = [
  { id: 1, amount: 50, status: "已开具", createdAt: "2024-09-28 14:30:00" },
  { id: 2, amount: 30, status: "待申请", createdAt: "2024-09-27 10:15:00" }
];

const mockParkingHistory = [
  { id: 1, parkingLotName: "中央公园停车场", startTime: "2024-09-28 10:00:00", endTime: "2024-09-28 12:00:00", fee: 20 },
  { id: 2, parkingLotName: "商业中心停车场", startTime: "2024-09-27 14:00:00", endTime: "2024-09-27 16:30:00", fee: 37.5 }
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const mockService = {
  getParkingLots: async () => {
    await delay(500);
    return mockParkingLots;
  },

  getParkingDetail: async (id) => {
    await delay(300);
    return mockParkingLots.find(lot => lot.id === parseInt(id));
  },

  getUserInfo: async () => {
    await delay(300);
    return mockUserInfo;
  },

  updateUserInfo: async (userInfo) => {
    await delay(500);
    Object.assign(mockUserInfo, userInfo);
    return { success: true };
  },

  getInvoices: async () => {
    await delay(500);
    return mockInvoices;
  },

  requestInvoice: async (paymentId) => {
    await delay(700);
    mockInvoices.push({
      id: mockInvoices.length + 1,
      amount: Math.floor(Math.random() * 100) + 20,
      status: "待开具",
      createdAt: new Date().toISOString()
    });
    return { success: true };
  },

  createPayment: async (parkingSessionId) => {
    await delay(500);
    return {
      id: `payment_${Date.now()}`,
      amount: Math.floor(Math.random() * 100) + 20,
      status: "pending"
    };
  },

  getPaymentStatus: async (paymentId) => {
    await delay(300);
    return { status: Math.random() > 0.5 ? 'success' : 'pending' };
  },

  getParkingHistory: async () => {
    await delay(500);
    return mockParkingHistory;
  },

  startParking: async (parkingLotId, carNumber) => {
    await delay(500);
    return {
      sessionId: `session_${Date.now()}`,
      startTime: new Date().toISOString(),
      parkingLotId: parkingLotId,
      carNumber: carNumber
    };
  },

  endParking: async (sessionId) => {
    await delay(500);
    return {
      sessionId: sessionId,
      endTime: new Date().toISOString(),
      fee: Math.floor(Math.random() * 50) + 10
    };
  }
};

export default mockService;