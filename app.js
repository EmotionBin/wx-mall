//app.js
App({
  //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
  onLaunch: function(options){
    //这里配置云开发的环境
    wx.cloud.init({
      env:'hwb-k1kqw',
      traceUser:true
    })
  }
});