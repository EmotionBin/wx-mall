// pages/cart/index.js

import { request } from "../../request/index.js";
import {getSetting,chooseAddress,openSetting,showModal,showToast,requestPayment} from "../../utils/asyncWx.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //点击支付
  handleOrderPay:async function () {
    //判断缓存中有没有token
    const token = wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }
    //创建订单
    //拼接请求参数
    const order_price = this.data.totalPrice;
    const consignee_addr = this.data.address.all;
    const cart = this.data.cart;
    let goods = [];
    cart.forEach(v => goods.push({
      goods_id:v.goods_id,
      goods_number:v.num,
      goods_price:v.goods_price
    }));
    const orderParams = {order_price,consignee_addr,goods}
    //发送请求 获取订单编号
    // const {order_number} = await request({url:'/my/orders/create',data:orderParams,method:'post'});
    // //发起预支付请求
    // const {pay} = await request({url:'/my/orders/req_unifiedorder',method:"post",data:{order_number}});
    //发起微信支付
    // const res = await requestPayment(pay);
    // console.log(res);
    //查询后台 订单状态
    // const res = await Request({url:'/my/orders/chkOrder',method:"post",data:{order_number}});
    // console.log(res);

    //提示没有支付权限
    await showToast({title:'sorry，当前小程序没有支付权限~'});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获取霍村中的收货地址信息
    const address = wx.getStorageSync('address');
    //获取缓存中的购物车的数据
    let cart = wx.getStorageSync('cart') || [];
    //过滤后的购物车数组
    cart = cart.filter(v => v.checked);
    //总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    });
    //把购物车数据重新设置会data中和缓存中
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})