// pages/details/details.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "statusBarHeight": app.globalData.statusBarHeight*2,
    //判断是否为全面屏
    "isFullSucreen":false,
    "joinGroup":false,
    "share":false,
    "saveImgSrc":"../../images/moni6.jpg"
    
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断是否为全面屏
    this.checkFullSucreen();
  },
  handleToBack(){
    wx.navigateBack({})
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
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      //console.log(ops.target)
    }
    var that = this
    return {
      title: '分享给好友',
      // path: 'pages/details/details?scene=' + that.data.openid,//点击分享消息是打开的页面
      imageUrl: that.data.saveImgSrc,
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
        var shareTickets = res.shareTickets;

      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  // 返回
  handleBack(){
    wx.navigateBack({})
  },
  //前往首页
  handleToHome(){
    wx.reLaunch({
      url: '../index/index'
    })
  },
  //前往订单页
  handleToConfirmOrder(){
    wx.navigateTo({
      url: '../confirmOrder/confirmOrder',
    })
  },
  //隐藏加入群聊
  handleToClose(){
      this.setData({
        "joinGroup":false
      })
  },
  //显示加入群聊
  handleToShow(){
     this.setData({
       "joinGroup":true
     })
  },
  //分享界面
  handleToShareHaibao(){
      this.setData({
          "share":true
      })
    },
  //发送给朋友
  handleToFriend(){


      this.setData({
        "share":false
      })
  },
  //保存给海报图
  handleToSave(){
      this.setData({
        "share":false
      })
  },
  //判断是否为全面屏
  checkFullSucreen: function () {
    const that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        // 根据 屏幕高度 进行判断
        if (res.screenHeight - res.windowHeight - res.statusBarHeight - 32 > 72) {
          that.setData({
            "isFullSucreen": true
          })
        }
      }
    })
  }
})