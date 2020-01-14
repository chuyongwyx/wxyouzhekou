// pages/coupon-details/coupon-details.js
import api from '../../apis/coupon.js';
import apis from '../../apis/login.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "statusBarHeight": app.globalData.statusBarHeight  ,
    "scrollTop": app.globalData.statusBarHeight * 2 + 100,
    "detailInfo":{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断登录是否过期
    //判断登录时间是否过期
    wx.getStorage({
      key: 'userImage',
      success: function (res) {
        wx.getStorage({
          key: 'createTokenTime',
          success: function (resTime) {
            var dateTime = new Date().getTime();
            var tokenTime = new Date(resTime.data).getTime();

            if (dateTime - tokenTime > 14400000) {
              wx.login({
                success: function (resCode) {
                  apis.handleToLogin(resCode.code).then((resLogin) => {
                    if (resLogin.code == 1) {
                      wx.setStorage({
                        key: 'token',
                        data: resLogin.data.token,
                      })
                      wx.setStorage({
                        key: 'createTokenTime',
                        data: resLogin.data.createTokenTime,
                      })
                    }
                  })
                },
                fail: function () {

                }
              })
            }


          },
        })


      },
    })
    var that =this;
    // api.handleCouponToUse(options.id, '').then((resData)=>{
    //   console.log(resData);
    //   var data =resData.data;
    //   console.log(data);
    //   data.writetime = data.writetime.substring(0,11);
    //     that.setData({
    //       "detailInfo":data
    //     })
    // })
    wx.getStorage({
      key: 'token',
      success: function(res) {
        api.handleCouponToUse(options.id, res.data).then((resData) => {
            var data =resData.data;
              data.writetime = data.writetime.substring(0,11);
                that.setData({
                  "detailInfo":data
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

  //返回
  handleToBack(){
    wx.navigateBack({})
  },
  //拨打电话
  handleToCall(e) {
    console.log(e);
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.id,
    })
  },
  //打开地图
  handleToOpenMap() {
    var that = this;
    wx.showLoading({
      title: '地图打开中',
    })
    console.log(that.data.detailInfo.lat);
    console.log(that.data.detailInfo.lng);
    wx.openLocation({
      latitude: parseFloat(that.data.detailInfo.lat),
      longitude: parseFloat(that.data.detailInfo.lng),
      success: function (res) {
        console.log(res);
        wx.hideLoading();
      }
    })
  },
  //图片预览
  handleToImageShow() {
    var that = this;
    var url = [];
    var licenses = that.data.detailInfo.licenses;
    for (var i = 0, len = licenses.length; i < len; i++) {
      url.push(licenses[i].url)
    }
    wx.showLoading({
      title: '加载中',
    })
    wx.previewImage({
      urls: url,
      success: function (res) {
        wx.hideLoading()
      }
    })
  }
})