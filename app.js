//app.js
import  base64 from './utils/base64.js'
App({
  onLaunch: function (res) {
    console.log(res);
  },
  onShow(options){
      wx.setStorage({
        key: 'sceen',
        data: options.scene,
      })
  },
  globalData: {
    statusBarHeight:wx.getSystemInfoSync()['statusBarHeight'],
    //好吃的
    goodsFood:false,
    //变美的
    changeBeatful:false,
    //出去浪
    goToPaly:false,
    //宝贝玩
    sonPlay:false

  }
})