import request from '../utils/request'

const getParkingLots = () => {
  return request('/parking-lots', 'GET')
}

const getParkingDetail = (id) => {
  return request(`/parking-lots/${id}`, 'GET')
}

const startParking = (parkingLotId, carNumber) => {
  return request('/parking-sessions', 'POST', { parkingLotId, carNumber })
}

const endParking = (sessionId) => {
  return request(`/parking-sessions/${sessionId}`, 'PUT', { status: 'ended' })
}

export default {
  getParkingLots,
  getParkingDetail,
  startParking,
  endParking
}