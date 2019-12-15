//app.js
App({
  onLaunch: function (e) {
      //判断设备是否为全面屏
    this.checkFullSucreen();
  },
  globalData: {
    statusBarHeight:wx.getSystemInfoSync()['statusBarHeight'],
    //当前设备为非全面屏
    isFullSucreen: false
  },
  checkFullSucreen: function () {

    const self = this

    wx.getSystemInfo({

      success: function (res) {
          console.log(res)
        // 根据 屏幕高度 进行判断
        if (res.screenHeight - res.windowHeight - res.statusBarHeight - 32 > 72) {

          self.globalData.isFullSucreen = true;
          
        }
      }

    })

  },
})