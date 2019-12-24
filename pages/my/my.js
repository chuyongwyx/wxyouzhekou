// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // "home": "../../images/dibulan_shouye2.png",
    // "found": "../../images/dibulan_faxian2.png",
    // "my": "../../images/dibulan_gerenzhongxin1.png",
    //未登录
    "userBeforeLogin":true,
    //已登录
    "userLogined":false,  
    //用户头像
    "userImage":"",
    //用户名称
    "userName":"",
    //距离顶部安全距离
    "statusBarHeight": app.globalData.statusBarHeight,
    //判断是否为全面屏
    "isFullSucreen": false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
      wx.getStorage(
        {
        key: 'userImage',
        success: function(res) {
           if(res.data!=""){
              that.setData({
                //未登录
                "userBeforeLogin": false,
                //已登录
                "userLogined": true,
                //用户头像
                "userImage": res.data,
               
              })
           }
        
        }  
      })
      wx.getStorage({
        key: 'userName',
        success: function(res) {
          if (res.data != "") {
            that.setData({
              //未登录
              "userBeforeLogin": false,
              //已登录
              "userLogined": true,
              //用户头像
              "userName": res.data

            })
          }
        },
      })
    //判断是否为全面屏
    this.checkFullSucreen();
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
  //获取用户信息
  handleTouserInfo(res){
      this.setData({
        "userImage":res.detail.userInfo.avatarUrl,
        "userName":res.detail.userInfo.nickName,
        "userBeforeLogin": false,
        //已登录
        "userLogined": true,  
      })
      wx.setStorage({
        key: "userImage",
        data: res.detail.userInfo.avatarUrl
      })
      wx.setStorage({
          key: "userName",
          data: res.detail.userInfo.nickName
        })
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
  },
  //跳往待使用
  handleToUseBefore(){
    wx.navigateTo({
      url: '../orderNoUse/orderNoUse',
    })
  },
//跳往全部订单
handleToMyOrder(){
    wx.navigateTo({
      url: '../order/order',
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