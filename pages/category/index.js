// 导入我自己封装的基于Promise的wx请求
import { request } from "../../request/index.js"

// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //接口返回的所有数据
    cates:[],
    //左侧菜单栏的数据
    leftMenuList:[],
    //右侧的数据
    rightContent:[],
    //当前激活的菜单
    curIndex:0,
    scrollTop:0
  },

  /**
   * 请求分类页面的菜单数据
   */
  getCates: async function () {
    let that = this;
    const result = await request({url: '/categories'});
    that.data.cates = result;
    wx.setStorageSync("cates",{time:Date.now(),data:this.data.cates});
    //构造左侧的菜单
    let leftMenuList = that.data.cates.map(item => item.cat_name);
    let rightContent = that.data.cates[0].children;
    that.setData({
      leftMenuList,
      rightContent
    })
    // request({
    //   url: '/categories'
    // })
    // .then(result => {
    //   //将所有数据先存储，再对数据进行处理
    //   that.data.cates = result.data.message;
    //   wx.setStorageSync("cates",{time:Date.now(),data:this.data.cates});
    //   //构造左侧的菜单
    //   let leftMenuList = that.data.cates.map(item => item.cat_name);
    //   let rightContent = that.data.cates[0].children;
    //   that.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // });
  },

  /**
   * 左侧菜单的点击事件
   */
  clickMenu:function (e) {
    let that = this;
    // console.log(e);
    //获取当前点击的菜单的索引
    const {index} = e.currentTarget.dataset;
    //根据索引来切换右侧内容的显示
    let rightContent = that.data.cates[index].children;
    that.setData({
      curIndex: index,
      rightContent,
      scrollTop:0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取分类页面的所有数据
    // this.getCates();
    const Cates = wx.getStorageSync("cates");
    console.log(Cates);
    if(!Cates){
      this.getCates();
    }else{
      if(Date.now() - Cates.time > 1000 * 10){
        this.getCates();
      }else{
        this.data.cates = Cates.data;
        console.log(this.data.cates);
        let leftMenuList = this.data.cates.map(item => item.cat_name);
        let rightContent = this.data.cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
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