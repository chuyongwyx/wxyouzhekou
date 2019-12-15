// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "home": "../../images/dibulan_shouye2.png",
    "found": "../../images/dibulan_faxian2.png",
    "my": "../../images/dibulan_gerenzhongxin1.png",
    //距离顶部安全距离
    "statusBarHeight": app.globalData.statusBarHeight,
    //判断是否为全面屏
    "isFullSucreen": app.globalData.isFullSucreen ? true : false 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  //跳转首页
  handleToHome(){
    wx.reLaunch({
      url: '../index/index',
    })
  },
  //跳转到发现页
  handleToFound(){
    wx.reLaunch({
      url: '../found/found',
    })
  },
  // 跳往优惠券
  handleToCoupon() {
    wx.navigateTo({
      url: '../coupon/coupon',
    })
  }
})