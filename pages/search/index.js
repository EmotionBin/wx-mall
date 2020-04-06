// pages/search/index.js

import { request } from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    isFocus:false
  },
  //防抖定时器id
  TimeId:-1,

  //输入框的值改变就触发的事件
  handleInput:function (e) {
    const {value} = e.detail;
    if(!value.trim()){
      this.TimeId = setTimeout(() => {
        this.setData({
          goods:[],
          isFocus:false,
          inpValue:''
        });
      },1000);
      return;
    }
    this.setData({
      isFocus:true
    });
    //发送请求获取数据 同时实现防抖功能
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.qsearch(value);
    },1000);
  },

  //发送请求获取收缩建议的数据
  qsearch:async function (query) {
    const res = await request({url:'/goods/qsearch',data:{query}});
    console.log(res);
    this.setData({
      goods:res
    })
  },

  //点击取消按钮
  handleCancel:function () {
    this.setData({
      inpValue:'',
      isFocus:false,
      goods:[]
    })
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
  onShow: function () {

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