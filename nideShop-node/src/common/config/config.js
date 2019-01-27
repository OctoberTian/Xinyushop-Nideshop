// default config
module.exports = {
  default_module: 'api',
  weixin: {
    appid: 'wxf77c532bf5b18e82', // 小程序 appid
    secret: '7cf7859ddf95a840aafbe1665eff17dc', // 小程序密钥
    mch_id: '1521793421', // 商户帐号ID
    partner_key: '214214wangsenliangxinyucaoshi214', // 微信支付密钥
    notify_url: 'http://115.159.79.191:8888/notify' // 微信异步通知，例：https://www.nideshop.com/api/pay/notify
  },
  express: {
    // 快递物流信息查询使用的是快递鸟接口，申请地址：http://www.kdniao.com/
    appid: '', // 对应快递鸟用户后台 用户ID
    appkey: '', // 对应快递鸟用户后台 API key
    request_url: 'http://api.kdniao.cc/Ebusiness/EbusinessOrderHandle.aspx'
  }
};
