var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const pay = require('../../services/pay.js');

var app = getApp();
Page({
  data: {
    status: false,
    orderId: 0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      orderId: options.orderId || 24,
      status: options.status
    })
    
  },
  onReady: function () {

  },
  onShow: function () {
    // 页面显示
    let that = this;
    console.log('status:', this.data.status);
    util.request(api.PayStatus, {
      id: that.data.orderId,
      status: that.data.status
    }).then(function (res) {
      console.log('支付成功！')
    });
    
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  payOrder() {
    pay.payOrder(parseInt(this.data.orderId)).then(res => {
      this.setData({
        status: true
      });
      let that = this;
      console.log('status:', this.data.status);
      if (this.data.status === true){
        util.request(api.PayStatus, {
          id: that.data.orderId,
          status: 1
        }).then(function (res) {
          console.log('支付成功！')
        });
      }else{
        console.log("status is false");
      }
    }).catch(res => {
      util.showErrorToast('支付失败');
    });
  }
})