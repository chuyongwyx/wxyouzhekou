// pages/search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "statusBarHeight": app.globalData.statusBarHeight * 2 + 10,
    "searchTop": app.globalData.statusBarHeight * 2+220,
    "searchPlace":true,
    "searchInput":false,
    "inputVal":"",
    "clear":false
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
  //路由返回
  handleToBack(){
      wx.navigateBack({})
  },
  // 点击显示input
  handleToInput(){
      this.setData({
        "searchPlace":false,
        "searchInput": true
      })
  },
  //隐藏input
  handleToSearchPlace(){
    this.setData({
      "searchPlace": true,
      "searchInput": false
    })
  },
  //得到input框中数据
  handleInputText(e){
      console.log(e.detail.value);
    this.setData({
      "clear":true,
    })
  },
  //清除value
  onToggle(e){
    this.setData({
      "inputVal": "",
      "searchPlace": true,
      "searchInput": false
    })
  }
})