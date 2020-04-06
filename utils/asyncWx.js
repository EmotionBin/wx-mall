
/**
 * primise 形式的getSetting
 */

export const getSetting = () => {
  return new Promise((resolve,reject) => {
    wx.getSetting({
      success: (result)=>{
        resolve(result);
      },
      fail: (err)=>{
        reject(err);
      },
      complete: ()=>{}
    });
  })
}

/**
 * primise 形式的chooseAddress
 */

export const chooseAddress = () => {
  return new Promise((resolve,reject) => {
    wx.chooseAddress({
      success: (result)=>{
        resolve(result);
      },
      fail: (err)=>{
        reject(err);
      },
      complete: ()=>{}
    });
  })
}

/**
 * primise 形式的openSetting
 */

export const openSetting = () => {
  return new Promise((resolve,reject) => {
    wx.openSetting({
      success: (result)=>{
        resolve(result);
      },
      fail: (err)=>{
        reject(err);
      },
      complete: ()=>{}
    });
  })
}

/**
 * primise 形式的showModal
 */

export const showModal = ({content}) => {
  return new Promise((resolve,reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      success: (result) => {
        resolve(result);
      },
      fail: (err)=>{
        reject(err);
      }
    });
  })
}

/**
 * primise 形式的showToast
 */

export const showToast = ({title}) => {
  return new Promise((resolve,reject) => {
    wx.showToast({
      title: title,
      icon:'none',
      success: (result) => {
        resolve(result);
      },
      fail: (err)=>{
        reject(err);
      }
    });
  })
}

/**
 * primise 形式的login
 */

export const login = () => {
  return new Promise((resolve,reject) => {
    wx.login({
      timeout:10000,
      success: (result)=>{
        resolve(result);
      },
      fail: (err)=>{
        reject(err);
      },
    });
  })
}

/**
 * primise 形式的云函数调用
 * @param name 函数名称
 */

export const WxCloud = ({name}) => {
  return new Promise((resolve,reject) => {
    //显示加载中效果
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    //调用云函数
    wx.cloud.callFunction({
      name,
      success:res => {
        resolve(res);
      },
      fail:err => {
        reject(err);
      },
      complete: ()=>{
        //关闭正在等待的图标
        wx.hideLoading();
      }
    })
  })
}

/**
 * primise 形式的小程序的微信支付
 */

export const requestPayment = (pay) => {
  return new Promise((resolve,reject) => {
    wx.requestPayment({
      ...pay,
      success: (result)=>{
        resolve(result);
      },
      fail: (err)=>{
        reject(err);
      }
    });
  })
}


