// pages/incomeDetails/incomeDetail.js;
import api from '../../apis/my.js';
import apis from '../../apis/login.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "statusBarHeight": app.globalData.statusBarHeight,
    "dataList":[],
    //累计收入
    "total_commission":"",
    //可提现
    "commission":'',
    //待到账
    "total_arrival":'',
    // 全部
    "all":true,
    "get":false,
    "await":false,
    "comtrue":false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断登录是否过期
    wx.checkSession({
      //未过期
      success: function () {

      },
      //过期了
      fail: function () {
        wx.getStorage({
          key: 'userImage',
          success: function (res) {
            wx.login({
              success: function (resCode) {
                apis.handleToLogin(resCode.code).then((resLogin) => {
                  console.log(resLogin)
                  if (resLogin.code === 1) {
                    wx.setStorage({
                      key: 'token',
                      data: resLogin.data.token,
                    })
                  }
                })
              },
              fail: function () {

              }
            })
          },
        })
      }
    })
      var that =this;
      wx.getStorage({
        key: 'token',
        success: function(res) {
          api.handleGetBudgetRecord(res.data,'').then((resData)=>{
              console.log(resData);
              that.setData({
                "dataList":resData.data,
                "total_commission": resData.total_commission,
                "commission": resData.commission,
                "total_arrival": resData.total_arrival
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
  handleToBack(){
    wx.navigateBack({})
  },
  //进行分类
  handletotype(resId){
    if (resId.currentTarget.id=='0'){
      var that = this;
      wx.getStorage({
        key: 'token',
        success: function (res) {
          api.handleGetBudgetRecord(res.data, '').then((resData) => {
            console.log(resData);
            that.setData({
              "dataList": resData.data,
              "total_commission": resData.total_commission,
              "commission": resData.commission,
              "total_arrival": resData.total_arrival,
              "all": true,
              "get": false,
              "await": false,
              "comtrue": false

            })
          })
        },
      })
    }
    if (resId.currentTarget.id == '1'){
      var that = this;
      wx.getStorage({
        key: 'token',
        success: function (res) {
          api.handleGetBudgetRecord(res.data, resId.currentTarget.id ).then((resData) => {
            console.log(resData);
            that.setData({
              "dataList": resData.data,
              "total_commission": resData.total_commission,
              "commission": resData.commission,
              "total_arrival": resData.total_arrival,
              "all": false,
              "get": true,
              "await": false,
              "comtrue": false

            })
          })
        },
      })
    }
    if (resId.currentTarget.id == '2'){
      var that = this;
      wx.getStorage({
        key: 'token',
        success: function (res) {
          api.handleGetBudgetRecord(res.data, resId.currentTarget.id).then((resData) => {
            console.log(resData);
            that.setData({
              "dataList": resData.data,
              "total_commission": resData.total_commission,
              "commission": resData.commission,
              "total_arrival": resData.total_arrival,
              "all": false,
              "get": false,
              "await": true,
              "comtrue": false

            })
          })
        },
      })
    }
    if(resId.currentTarget.id=='3'){
      var that = this;
      wx.getStorage({
        key: 'token',
        success: function (res) {
          api.handleGetBudgetRecord(res.data, resId.currentTarget.id).then((resData) => {
            console.log(resData);
            that.setData({
              "dataList": resData.data,
              "total_commission": resData.total_commission,
              "commission": resData.commission,
              "total_arrival": resData.total_arrival,
              "all": false,
              "get": false,
              "await": false,
              "comtrue": true

            })
          })
        },
      })
    }
  }
})