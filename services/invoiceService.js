import request from '../utils/request'

const getInvoices = () => {
  return request('/invoices', 'GET')
}

const requestInvoice = (paymentId) => {
  return request('/invoices', 'POST', { paymentId })
}

const getInvoiceDetails = (invoiceId) => {
  return request(`/invoices/${invoiceId}`, 'GET')
}

export default {
  getInvoices,
  requestInvoice,
  getInvoiceDetails
}
