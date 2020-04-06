// pages/order/index.js

import { request } from "../../request/index.js";
import {getSetting,chooseAddress,openSetting,showModal,showToast,requestPayment} from "../../utils/asyncWx.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[],
    tabs:[
      {
        id:0,
        value:'全部',
        isActive:true
      },
      {
        id:1,
        value:'待付款',
        isActive:false
      },
      {
        id:2,
        value:'待发货',
        isActive:false
      },
      {
        id:3,
        value:'退款/退货',
        isActive:false
      }
    ],
  },

  handleTabsItemChange:async function (e) {
    const {index} = e.detail;
    this.changeTitleByIndex(index);
    //重新发送请求
    // this.getOrders(index + 1);
    await showToast({title:'sorry，暂无数据~'});
  },

  //根据标题索引来激活选中标题数组
  changeTitleByIndex:function (index) {
    let {tabs} = this.data;
    tabs.forEach((v,i) => i === index?v.isActive = true:v.isActive = false);
    this.setData({
      tabs
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function (options) {
    const token = wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }
    let pages = getCurrentPages();
    //数组中索引最大的就是当前页面
    let currentPage = pages[pages.length - 1];
    //获取url上的type参数
    const {type} = currentPage.options;
    //激活选中页面标题
    this.changeTitleByIndex(type - 1);
    // this.getOrders(type);
    await showToast({title:'sorry，暂无数据~'});
  },

  //获取订单列表的方法
  getOrders:async function(type){
    const res = await request({url:'/my/orders/all',data:type});
    console.log(res);
    this.setData({
      orders:res.orders.map(v => ({...v,create_time_cn:(new Date(v.create_time * 1000).toLocaleString())}))
    })
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