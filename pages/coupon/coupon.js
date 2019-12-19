// pages/coupon/coupon.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "statusBarHeight": app.globalData.statusBarHeight * 2 ,
    "scrollTop": app.globalData.statusBarHeight * 2 + 190,
    "allCoupon":true,
    "couponUseBefore":false,
    "couponUsed":false,
    "couponTimed":false,
    //这是模拟后端返回的数据
    "couponList":[
        {
            "couponPrice":"100",
            "shopName":"心狠手辣"
        },
        {
          "couponPrice": "100",
          "shopName": "心狠手辣"
        },
        {
          "couponPrice": "100",
          "shopName": "心狠手辣"
        }, 
        {
          "couponPrice": "100",
          "shopName": "心狠手辣"
        }, 
        {
          "couponPrice": "100",
          "shopName": "心狠手辣"
        }
    ],
    //详情信息的显引开关
    "detailsList":[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //遍历循环从后端请求回来的数据
      var detailsListTwo =[];
      for (var i = 0, len=this.data.couponList.length;i<len;i++){
        detailsListTwo.push('false');
      }
     this.setData({
       "detailsList": detailsListTwo
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
 //详情的显示和隐藏
  handleToShowOrHide(e){
    console.log(e);
    //到时候给的数据肯定是一个数组
    //这个时候在data中定义一个数组这个数组中就放对应的false
    //再来控制开关
    var index =parseInt(e.currentTarget.dataset.id);
    //遍历循环从后端请求回来的数据
    var detailsListTwo = this.data.detailsList;
    console.log(this.data.detailsList);
    if (this.data.detailsList[index]=="false"){
      detailsListTwo[index]='true';
      this.setData({
        "detailsList": detailsListTwo
      })
    }else{
      detailsListTwo[index] = 'false';
      this.setData({
        "detailsList": detailsListTwo
      })
    }
  },
  //返回
  handleToBack(){
    wx.navigateBack({})
  },
  //跳到立即使用
  handleToUse(){
    wx.navigateTo({
      url: '../coupon-details/coupon-details',
    })
  }
})