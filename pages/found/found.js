// pages/found/found.js
const app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "home": "../../images/dibulan_shouye2.png",
    "found": "../../images/dibulan_faxian1.png",
    "my": "../../images/dibulan_gerenzhongxin2.png",
    "statusBarHeight": app.globalData.statusBarHeight,
    "bannerTop": app.globalData.statusBarHeight*2+270,
    // 筛选栏活跃状态
    "allFood":true,
    "near":false,
    "mind":false,
    //滚动状态
    "scrollBefore":true,
    "scrollIng":false,
    //判断是否为全面屏
    "isFullSucreen": false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断是否为全面屏
    this.checkFullSucreen()
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

  },
  // 页面滚动
  onPageScroll:function(event){
    console.log(event)
    if (event.scrollTop > 190) {
      this.setData({
        "scrollBefore": false,
        "scrollIng": true
  
      })
    } else {
      this.setData({
        "scrollBefore": true,
        "scrollIng": false
    
      })
    }
  },
  handleToHome(){
    wx.reLaunch({
      url: '../index/index',
    })
  },
  handleToMy(){
    wx.reLaunch({
      url: '../my/my',
    })
  },
  handleToSearch(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  //判断是否为全面屏
  checkFullSucreen: function () {
    const that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        // 根据 屏幕高度 进行判断
        if (res.screenHeight - res.windowHeight -res.statusBarHeight - 32 > 72) {
          that.setData({
            "isFullSucreen": true
          })
        }
      }
    })

  }



})