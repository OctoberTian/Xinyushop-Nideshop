var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();

Page({
  data: {
    userSession: 1,
    addressList: [],
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getAddressList();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // let that = this;
    // wx.checkSession({
    //   success: function () {
    //     that.setData({
    //       userSession: 1
    //     })
    //   },
    //   fail: function () {
    //     that.setData({
    //       userSession: 0
    //     })
    //   }
    // });
    // 页面显示
  },
  getAddressList (){
    let that = this;
    util.request(api.AddressList).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          addressList: res.data
        });
      }
    });
  },
  addressAddOrUpdate (event) {
    console.log(event)
    wx.navigateTo({
      url: '/pages/ucenter/addressAdd/addressAdd?id=' + event.currentTarget.dataset.addressId
    })
  },
  deleteAddress(event){
    console.log(event.target)
    let that = this;
    wx.showModal({
      title: '',
      content: '确定要删除地址？',
      success: function (res) {
        if (res.confirm) {
          let addressId = event.target.dataset.addressId;
          util.request(api.AddressDelete, { id: addressId }, 'POST').then(function (res) {
            if (res.errno === 0) {
              that.getAddressList();
            }
          });
          console.log('用户点击确定')
        }
      }
    })
    return false;
    
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})