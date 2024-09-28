import mockService from '../../services/mockService';

Page({
  data: {
    invoices: [],
    filteredInvoices: [],
    currentPage: 1,
    pageSize: 10,
    totalPages: 1,
    dateFilter: '',
    statusFilterOptions: ['全部', '待申请', '已开具'],
    statusFilterIndex: 0
  },

  onLoad: function() {
    this.fetchInvoices();
  },

  fetchInvoices: function() {
    wx.showLoading({ title: '加载中' });
    mockService.getInvoices()
      .then(invoices => {
        this.setData({ 
          invoices: invoices,
          filteredInvoices: invoices
        });
        this.updatePagination();
        wx.hideLoading();
      })
      .catch(error => {
        console.error('Failed to fetch invoices:', error);
        wx.hideLoading();
        wx.showToast({
          title: '获取发票列表失败',
          icon: 'none'
        });
      });
  },

  updatePagination: function() {
    const totalPages = Math.ceil(this.data.filteredInvoices.length / this.data.pageSize);
    this.setData({ totalPages });
  },

  onDateFilterChange: function(e) {
    this.setData({
      dateFilter: e.detail.value,
      currentPage: 1
    });
    this.filterInvoices();
  },

  onStatusFilterChange: function(e) {
    this.setData({
      statusFilterIndex: e.detail.value,
      currentPage: 1
    });
    this.filterInvoices();
  },

  filterInvoices: function() {
    let filtered = this.data.invoices;

    if (this.data.dateFilter) {
      filtered = filtered.filter(invoice => 
        invoice.createdAt.startsWith(this.data.dateFilter)
      );
    }

    const statusFilter = this.data.statusFilterOptions[this.data.statusFilterIndex];
    if (statusFilter !== '全部') {
      filtered = filtered.filter(invoice => invoice.status === statusFilter);
    }

    this.setData({ 
      filteredInvoices: filtered,
      currentPage: 1
    });
    this.updatePagination();
  },

  requestInvoice: function(e) {
    const invoiceId = e.currentTarget.dataset.id;
    wx.showLoading({ title: '正在申请发票' });
    mockService.requestInvoice(invoiceId)
      .then(() => {
        wx.hideLoading();
        wx.showToast({ title: '发票申请成功' });
        this.fetchInvoices();  // 刷新发票列表
      })
      .catch(error => {
        wx.hideLoading();
        console.error('Failed to request invoice:', error);
        wx.showToast({
          title: '申请发票失败',
          icon: 'none'
        });
      });
  },

  downloadInvoice: function(e) {
    const invoiceId = e.currentTarget.dataset.id;
    wx.showLoading({ title: '正在下载发票' });
    // 这里应该调用实际的下载API
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '发票下载完成',
        icon: 'success'
      });
    }, 2000);
  },

  onPreviousPage: function() {
    if (this.data.currentPage > 1) {
      this.setData({
        currentPage: this.data.currentPage - 1
      });
    }
  },

  onNextPage: function() {
    if (this.data.currentPage < this.data.totalPages) {
      this.setData({
        currentPage: this.data.currentPage + 1
      });
    }
  }
});