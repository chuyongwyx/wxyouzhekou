// pages/order/order.js
import api  from "../../apis/orderList.js";
import apis from "../../apis/login.js";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "statusBarHeight": app.globalData.statusBarHeight,
    "dataInfo":[]
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
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log(res);
        api.handleConfirmOrder(options.id, res.data).then((resData) => {
          console.log(resData)
          // console.log(resData)
          that.setData({
              "dataInfo":resData.data
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
  //复制单号
  handleToCopy(){
    wx.setClipboardData({
      data: this.data.dataInfo.order_id,
      success: function () {
        // 添加下面的代码可以复写复制成功默认提示文本`内容已复制` 
        wx.showToast({
          title: '复制成功',
          duration: 3000
        })
        wx.getClipboardData({
          success: function (res) {
          }
        })
      }
    })
   
  }

})