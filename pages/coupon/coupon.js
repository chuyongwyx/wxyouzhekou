// pages/coupon/coupon.js;
import api from '../../apis/coupon.js';
import apis from '../../apis/login.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "statusBarHeight": app.globalData.statusBarHeight ,
    "scrollTop": app.globalData.statusBarHeight * 2 + 190,
    "allCoupon":false,
    "couponUseBefore":false,
    "couponUsed":false,
    "couponTimed":false,
    "allCount":"",
    "waitCount":"",
    "useCount":"",
    "overdueCount":"",
    //后端返回的数据
    "couponList":[],
    //详情信息的显引开关
    "detailsList":[]
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
      //遍历循环从后端请求回来的数据
    if (options.id == 1) {
      this.setData({
        "allCoupon": false,
        "couponUseBefore": true,
        "couponUsed": false,
        "couponTimed": false,
      })
    }else if (options.id == 2) {
      this.setData({
        "allCoupon": false,
        "couponUseBefore": false,
        "couponUsed": true,
        "couponTimed": false,
      })
    }else if (options.id == 3) {
      this.setData({
        "allCoupon": false,
        "couponUseBefore": false,
        "couponUsed": false,
        "couponTimed": true,
      })
    }else{
      this.setData({
        "allCoupon": true,
        "couponUseBefore": false,
        "couponUsed": false,
        "couponTimed": false,
      })
    }


      var that = this;
      console.log(options);
     
        wx.getStorage({
          key: 'token',
          success: function(res) {
            api.handleCoupon(res.data,options.id).then((resData)=>{
              var detailsListTwo = [];
              var couponListTwo = [];
              couponListTwo = resData.data
              for (var i = 0, len = resData.data.length; i < len; i++) {
                detailsListTwo.push('false');
                couponListTwo[i].writetime = couponListTwo[i].writetime.substr(0, 11);
              }
                that.setData({
                  "detailsList": detailsListTwo,
                  "couponList": couponListTwo,
                    "allCount": resData.allCount,
                    "waitCount": resData.waitCount,
                    "useCount": resData.useCount,
                    "overdueCount": resData.overdueCount,
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
  //点击跳往各个分类
  handleTocouponList(res){ 
    if (res.currentTarget.id == 1) {
      this.setData({
        "allCoupon": false,
        "couponUseBefore": true,
        "couponUsed": false,
        "couponTimed": false,
      })
    } else if (res.currentTarget.id == 2) {
      this.setData({
        "allCoupon": false,
        "couponUseBefore": false,
        "couponUsed": true,
        "couponTimed": false,
      })
    } else if (res.currentTarget.id == 3) {
      this.setData({
        "allCoupon": false,
        "couponUseBefore": false,
        "couponUsed": false,
        "couponTimed": true,
      })
    } else {
      this.setData({
        "allCoupon": true,
        "couponUseBefore": false,
        "couponUsed": false,
        "couponTimed": false,
      })
    }

    var that = this;
    // api.handleCoupon('', res.currentTarget.id).then((resData) => {
    //   console.log(resData);
    //   //过滤字段
    //   var detailsListTwo = [];
    //   var couponListTwo = [];
    //   couponListTwo = resData.data
    //   for (var i = 0, len = resData.data.length; i < len; i++) {
    //     detailsListTwo.push('false');
    //     couponListTwo[i].writetime = couponListTwo[i].writetime.substr(0, 11);
    //   }
    //   that.setData({
    //     "couponList": couponListTwo,
    //     "detailsList": detailsListTwo,
    //   })
    // });
      wx.getStorage({
          key: 'token',
          success: function(resToken) {
            api.handleCoupon(resToken.data,res.currentTarget.id).then((resData)=>{
                 //   //过滤字段
                    var detailsListTwo = [];
                    var couponListTwo = [];
                    couponListTwo = resData.data
                    for (var i = 0, len = resData.data.length; i < len; i++) {
                      detailsListTwo.push('false');
                      couponListTwo[i].writetime = couponListTwo[i].writetime.substr(0, 11);
                    }
                    that.setData({
                      "couponList": couponListTwo,
                      "detailsList": detailsListTwo,
                    })

            })
          },
        })


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
  //请求优惠券列表
  handleToCoupons(){
      
  },
  //返回
  handleToBack(){
    wx.navigateBack({})
  },
  //跳到立即使用
  handleToUse(res){
    wx.navigateTo({
      url: '../coupon-details/coupon-details?id='+res.currentTarget.id,
    })
  }
})