// pages/auth/index.js

import {login} from "../../utils/asyncWx.js";
import { request } from "../../request/index.js";
import {WxCloud} from "../../utils/asyncWx.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用户的信息
    userInfo:{},
    //每个用户的唯一标识符
    openid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //获取用户信息
  handleGetUserInfo:async function (e) {
    try {
      // //获取用户信息
      // const {userInfo} = e.detail;
      // //调用云函数获取openid
      // const res = await WxCloud({name:'login'});
      // const {openid} = res.result;
      // this.setData({
      //   openid,
      //   userInfo
      // });
      // console.log(openid);
      // //写入缓存中 同时返回上一个页面
      // wx.setStorageSync('token', openid);
      // wx.navigateBack({
      //   delta: 1
      // });


      // wx.cloud.callFunction({
      //   name:'login',
      //   success:res => {
      //     console.log('云函数调用成功');
      //     const {openid} = res.result;
      //     this.setData({
      //       openid,
      //       userInfo
      //     });
      //   },
      //   fail:err => {
      //     console.log('云函数调用失败');
      //   }
      // });


      //获取用户信息
      const {encryptedData,rawData,iv,signature} = e.detail;
      //获取小程序登录成功后的code
      const {code} = await login();
      const loginParams = {encryptedData,rawData,iv,signature,code};
      console.log(e.detail);
      //发送请求获取用户的token值
      // const {token} = await request({url:'/users/wxlogin',data:loginParams,method:'post'});
      //这里token直接写死，因为调用接口拿不到token
      const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
      console.log(token);
      wx.setStorageSync('token', token);
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error);
    }
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