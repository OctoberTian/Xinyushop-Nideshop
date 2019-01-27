/* eslint-disable no-multi-spaces */
const Base = require('./base.js');
const rp = require('request-promise');

module.exports = class extends Base {

  async paystatusAction() {
    //调用notify
    let myurl='http://blog.octber.xyz:8888/notify_again';
    try {
      const options = {
        method: 'GET',
        url: myurl,
      };
      //console.log('------git in pay status------');
      const id = this.get('id');
      const status = this.get('status');
      console.log('status:',status);
      if(status==1){
        const change = await this.model('order').where({id: id}).update({order_status: 1});
        let returnData = await rp(options);
        console.log('get in Octber notify:',returnData);
      }
      
    }catch(err){
      console.log(err);
    }
    return 'success';
  }

  /**
   * 获取支付的请求参数
   * @returns {Promise<PreventPromise|void|Promise>}
   */
  async prepayAction() {
    //console.log('get in prepay');
    const orderId = this.get('orderId');
    const orderInfo = await this.model('order').where({ id: orderId }).find();
    //console.log('orderInfo',orderInfo);
    if (think.isEmpty(orderInfo)) {
      return this.fail(400, '订单已取消');
    }
    if (parseInt(orderInfo.pay_status) !== 0) {
      return this.fail(400, '订单已支付，请不要重复操作');
    }
    const openid = await this.model('user').where({ id: orderInfo.user_id }).getField('weixin_openid', true);
    //console.log('openid:',openid);
    if (think.isEmpty(openid)) {
      return this.fail('微信支付失败');
    }
    const WeixinSerivce = this.service('weixin', 'api');
    //console.log('grt in weixinservice');
    try {
      const returnParams = await WeixinSerivce.createUnifiedOrder({
        openid: openid,
        body: '订单编号：' + orderInfo.order_sn,
        out_trade_no: orderInfo.order_sn,
        total_fee: parseInt(orderInfo.actual_price * 100),
        spbill_create_ip: ''
      });
      //console.log('returnParams',returnParams);
      return this.success(returnParams);
    } catch (err) {
      return this.fail('微信支付失败');
    }
  }

  async notifyAction() {
    const WeixinSerivce = this.service('weixin', 'api');
    const result = WeixinSerivce.payNotify(this.post('xml'));
    if (!result) {
      return `<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[支付失败]]></return_msg></xml>`;
    }

    const orderModel = this.model('order');
    const orderInfo = await orderModel.getOrderByOrderSn(result.out_trade_no);
    if (think.isEmpty(orderInfo)) {
      return `<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[订单不存在]]></return_msg></xml>`;
    }

    if (orderModel.updatePayStatus(orderInfo.id, 2)) {
    } else {
      return `<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[订单不存在]]></return_msg></xml>`;
    }

    return `<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>`;
  }
};
