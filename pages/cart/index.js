// pages/cart/index.js

/**
 * 
 *  关于微信支付
  1.那些人 哪些账号 可以实现微信支付
    1.企业账号
    2.企业账号的小程序后台中 必须给发开发添加上白名单
      1.一个appid可以同时绑定多个开发者
      2.这些开发者就可以共用这个appid和他的开发权限
 */

import {getSetting,chooseAddress,openSetting,showModal,showToast} from "../../utils/asyncWx.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //点击收货地址
  handleChooseAddress:async function () {
    try {
      //首先获取权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting['scope.address'];
      //判断权限状态
      if(scopeAddress === false){
        //诱导用户打开授权页面
        await openSetting();
      }
      //调用获取地址的api
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      //将收货地址存入缓存中
      wx.setStorageSync('address', address);
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
    //获取霍村中的收货地址信息
    const address = wx.getStorageSync('address');
    //获取缓存中的购物车的数据
    const cart = wx.getStorageSync('cart') || [];
    
    this.setData({address});
    this.setCart(cart);
  },

  //商品的选中
  handleItemChange:function (e) {
    //获取被修改的商品的id
    const goods_id = e.currentTarget.dataset.id;
    //获取购物车数组
    let {cart} = this.data;
    //找到被修改的商品对象
    let index = cart.findIndex(v => v.goods_id === goods_id);
    //选中状态反选
    cart[index].checked = !cart[index].checked;

    this.setCart(cart);
  },

  //设置购物车状态同时 重新计算 底部工具栏的数量 全选 总价格 购买的数量
  setCart:function (cart) {
    //总价格 总数量
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if(v.checked){
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }else{
        allChecked = false;
      }
    })
    //判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false;
    //把购物车数据重新设置会data中和缓存中
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    });
    wx.setStorageSync('cart', cart);
  },

  //商品全选功能
  handleItemAllCheck:function () {
    //获取购物车中的数据
    let {cart,allChecked} = this.data;
    //修改值
    allChecked = !allChecked;
    //循环修改cart数组中的商品选中状态
    cart.forEach(v => v.checked = allChecked);
    //把修改后的值填充回data和缓存中
    this.setCart(cart);
  },

  //商品数量的编辑功能
  handleItemNumEdit: async function (e) {
    //获取传递过来的参数
    const {operation,id} = e.currentTarget.dataset;
    //获取购物车数组
    let {cart} = this.data;
    //找到需要修改的商品的索引
    const index = cart.findIndex(v => v.goods_id === id);
    //判断是否要执行删除操作
    if(cart[index].num === 1 && operation === -1){
      //弹窗提示
      const res = await showModal({content: '您是否要删除此商品？'});
      if(res.confirm){
        cart.splice(index,1);
        this.setCart(cart);
      }
    }else{
      //进行修改数量的操作
      cart[index].num += operation;
      //设置回缓存和data中
      this.setCart(cart);
    }
  },

  //点击结算
  handlePay:async function () {
    const {address,totalNum} = this.data;
    //判断收货地址
    if(!address){
      await showToast({title:'您还没有选择收货地址'});
      return;
    }
    //判断用户有没有选购商品
    if(totalNum === 0){
      await showToast({title:'您还没有选购商品'});
      return;
    }
    //跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/index',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
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