// 导入我自己封装的基于Promise的wx请求
import { request } from "../../request/index.js"
import {getSetting,chooseAddress,openSetting,showModal,showToast,requestPayment} from "../../utils/asyncWx.js"

// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    isCollect:false
  },
  GoodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const {goods_id} = options;
    // this.getGoodsDetail(goods_id);
  },

  async getGoodsDetail(goods_id){
    console.log(goods_id);
    const goodsObj = await request({url:'/goods/detail',data:{goods_id}});
    this.GoodsInfo = goodsObj;
    let collect = wx.getStorageSync('collect')||[];
    let isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id);
    this.setData({
      goodsObj:{
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        //iphone部分手机不识别webp图片格式
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsObj.pics,
      },
      isCollect
    })
  },

  // 点击轮播图放大预览
  handlePreviewImage:function(e){
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  },

  //点击加入购物车
  handleCartAdd:function () {
    //获取缓存中的购物车数组
    let cart = wx.getStorageSync("cart") || [];
    //判断商品对象是否存在于购物车数组中
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    if(index === -1){
      //不存在 第一次添加
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
    }else{
      //已经存在购物车数据 执行num++
      cart[index].num ++;
    }
    //把购物车重新添加回缓存中
    wx.setStorageSync('cart', cart);
    //弹窗提示
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      //true 防止用户手抖 疯狂点击
      mask: true,
    });
  },

  //点击商品收藏
  handleCollect:function () {
    let isCollect = false;
    let collect = wx.getStorageSync('collect')||[];
    let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    if(index !== -1){
      //收藏过
      collect.splice(index,1);
      isCollect = false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
    }else{
      //没有收藏过
      collect.push(this.GoodsInfo);
      isCollect = true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    }
    wx.setStorageSync('collect', collect);
    this.setData({
      isCollect
    });
  },

  //点击购买
  handleBuy:async function () {
    await showToast({title:'请先加入购物车，再点击购物车进行结算~'});
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
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    
    const {goods_id} = options;
    this.getGoodsDetail(goods_id);
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