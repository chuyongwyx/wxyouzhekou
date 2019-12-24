// pages/search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "statusBarHeight": app.globalData.statusBarHeight ,
    "searchTop": app.globalData.statusBarHeight * 2+220,
    "inputVal":"",
    "placeholder":"今天想去哪里吃喝玩乐",
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
  //得焦时
  handleTofocus(){
      this.setData({
        "placeholder": "",
      })
  },
  //隐藏input
  handleToSearchPlace(){
    this.setData({
      "inputVal": "",
      "placeholder": "今天想去哪里吃喝玩乐",
    })
    
  },
  //得到input框中数据
  handleInputText(e){
    this.setData({
      "clear":true,
    })
  },

  //清除value
  onToggle(e){
    this.setData({
      "inputVal": "",  
      "placeholder": "今天想去哪里吃喝玩乐",
    })
    
  }
})