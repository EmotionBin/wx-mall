// 导入我自己封装的基于Promise的wx请求
import { request } from "../../request/index.js"
import {getSetting,chooseAddress,openSetting,showModal,showToast,requestPayment} from "../../utils/asyncWx.js"

//Page Object
Page({
  data: {
    //轮播图数组
    swiperList: [],
    //导航列表
    catesList: [],
    //楼层数据
    floorList:[]
  },

  // handleClick:async function () {
  //   await showToast({title:'该功能暂未开放，点击下方分类可以选购商品~'});
  // },

  /**
   * 请求首页的轮播图数据
   */
  getSwiperList: function () {
    let that = this;
    request({
      url: '/home/swiperdata'
    })
    .then(result => {
      result.forEach(v => v.navigator_url = v.navigator_url.replace(/main/,'index'));
      that.setData({
        swiperList: result
      })
    });
  },

  /**
   * 请求首页的轮播图数据
   */
  getCatesList: function () {
    let that = this;
    request({
      url: '/home/catitems'
    })
    .then(result => {
      that.setData({
        catesList: result
      })
    })
  },

  /**
   * 请求首页的楼层数据
   */
  getFloorList: function () {
    let that = this;
    request({
      url: '/home/floordata'
    })
    .then(result => {
      result.forEach(v => v.product_list.forEach(v => v.navigator_url = v.navigator_url.replace(/goods_list/,'goods_list/index')));
      that.setData({
        floorList: result
      })
    })
  },

  //页面开始加载的时候就会触发的事件
  onLoad: function (options) {
    // 获取首页轮播图数据
    this.getSwiperList();
    // 获取首页导航栏数据
    this.getCatesList();
    // 获取首页楼层数据
    this.getFloorList();
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});