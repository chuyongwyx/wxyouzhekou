// pages/searchResult/searchResult.js；
import api from '../../apis/search.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "statusBarHeight": app.globalData.statusBarHeight,
    "inputVal": "",
    "kindsData":[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
      console.log(options);
    api.handelGetfindCoupon(options.searchVal).then((res)=>{
        console.log(res);
        that.setData({
          "kindsData":res.data
        })
    })  
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
  handleToSearch(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  handleToDetails(res){
    wx.navigateTo({
      url: '../details/details?id=' + res.currentTarget.id,
    })
  },
  handleToBack(){
    wx.navigateBack({
      url:'../search/search'
    })
  }
})