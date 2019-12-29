//app.js

App({
  onLaunch: function (res) {
    console.log(res);
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