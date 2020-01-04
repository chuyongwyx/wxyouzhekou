// pages/cash/cash.js
import api from '../../apis/my.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "statusBarHeight": app.globalData.statusBarHeight,
    "input":true,
    //累计收入
    "total_commission": '',
    //可提现
    "commission": '',
    //百分比
    "per":'',
    "inputVal":""
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        api.handleGetBudgetRecord(res.data, '').then((resData) => {
         var per= Math.ceil(parseFloat(resData.commission) * 100 / parseFloat(resData.total_commission));
          that.setData({
            "total_commission": resData.total_commission,
            "commission": resData.commission,
            "per":per+''
          })
        })
      },
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
    console.log(this.data.per)
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
  handleToBack(){
    wx.navigateBack({})
  },
  //input框的得焦时
  handleToFocus(){
    this.setData({
      "input":false
    })
  },
  handleToValue(e){
    this.setData({
      "input": true
    })
    this.setData({
      "inputVal":e.detail.value
    })
  },
  //提现
  handleToCertComeTrue(){
   if(this.data.inputVal%200 ==0){
     var that = this
     wx.getStorage({
       key: 'token',
       success: function (res) {
         api.handleforWithdrawa(res.data, that.data.inputVal).then((resData) => {
           if(resData.code==1){
             wx.showToast({
               title: '提现成功',
             })
           }
         })
       },
     })
   }else{
    
     wx.showToast({
       image: '../../images/fail.png',
       title: '请输入200的倍数',
     })
   }
  
  },

  handleToTelValue(e){
    console.log(e);
    this.setData({
      "inputVal": e.target.dataset.value
    })
  }
})