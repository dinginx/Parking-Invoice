const BASE_URL = 'https://your-api-endpoint.com/api'

export const fetchParkingLots = async () => {
  try {
    const response = await wx.request({
      url: `${BASE_URL}/parking-lots`,
      method: 'GET'
    })
    return response.data
  } catch (error) {
    console.error('API call failed:', error)
    throw error
  }
}

// 添加其他API调用函数...