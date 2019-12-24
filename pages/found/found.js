// pages/found/found.js
//获取应用实例
var QQMapWX = require('../../common/js/qqmap-wx-jssdk.min.js');
var qqmapsdk;
const app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "home": "../../images/dibulan_shouye2.png",
    "found": "../../images/dibulan_faxian1.png",
    "my": "../../images/dibulan_gerenzhongxin2.png",
    "statusBarHeight": app.globalData.statusBarHeight,
    "bannerTop": app.globalData.statusBarHeight*2+270,
    // 筛选栏活跃状态
    "allFood":true,
    "near":false,
    "mind":false,
    //滚动状态
    "scrollBefore":true,
    "scrollIng":false,
    //判断是否为全面屏
    "isFullSucreen": false,
    //定位
    "city":''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断是否为全面屏
    this.checkFullSucreen();
    //获取地理位置
    qqmapsdk = new QQMapWX({
      key:'K6ABZ-32PR6-LXWSL-EZWDW-XC3NH-CYFC4'
    })
    //获取地理定位
    this.getUserLocation();

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
  // 页面滚动
  onPageScroll:function(event){
    console.log(event)
    if (event.scrollTop > 190) {
      this.setData({
        "scrollBefore": false,
        "scrollIng": true
  
      })
    } else {
      this.setData({
        "scrollBefore": true,
        "scrollIng": false
    
      })
    }
  },
  // handleToHome(){
  //   wx.reLaunch({
  //     url: '../index/index',
  //   })
  // },
  // handleToMy(){
  //   wx.reLaunch({
  //     url: '../my/my',
  //   })
  // },
  handleToSearch(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  //判断是否为全面屏
  checkFullSucreen: function () {
    const that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        // 根据 屏幕高度 进行判断
        if (res.screenHeight - res.windowHeight -res.statusBarHeight - 32 > 72) {
          that.setData({
            "isFullSucreen": true
          })
        }
      }
    })

  },
  getUserLocation: function () {
    let vm = this
    wx.getSetting({
      success: (res) => {
        // res.authSetting['scope.userLocation'] == undefined  表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false  表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true  表示 地理位置授权
        // 拒绝授权后再次进入重新授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          // console.log('authSetting:status:拒绝授权后再次进入重新授权', res.authSetting['scope.userLocation'])
          wx.showModal({
            title: '',
            content: '【有折扣】需要获取你的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none'
                })
                setTimeout(() => {
                  wx.navigateBack()
                }, 1500)
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    // console.log('dataAu:success', dataAu)
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation(dataAu)
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none'
                      })
                      setTimeout(() => {
                        wx.navigateBack()
                      }, 1500)
                    }
                  }
                })
              }
            }
          })
        }
        // 初始化进入，未授权
        else if (res.authSetting['scope.userLocation'] == undefined) {
          // console.log('authSetting:status:初始化进入，未授权', res.authSetting['scope.userLocation'])
          //调用wx.getLocation的API
          vm.getLocation(res)
        }
        // 已授权
        else if (res.authSetting['scope.userLocation']) {
          // console.log('authSetting:status:已授权', res.authSetting['scope.userLocation'])
          //调用wx.getLocation的API
          vm.getLocation(res)
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function (userLocation) {
    let vm = this
    wx.getLocation({
      type: "wgs84",
      success: function (res) {
        // console.log('getLocation:success', res)
        var latitude = res.latitude;
        var longitude = res.longitude;
        vm.latitude = latitude;
        vm.longitude = longitude;
        vm.getLocat(latitude, longitude);
      },
      fail: function (res) {
        // console.log('getLocation:fail', res)
        if (res.errMsg === 'getLocation:fail:auth denied') {
          wx.showToast({
            title: '拒绝授权',
            icon: 'none'
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 1500)
          return
        }
        if (!userLocation || !userLocation.authSetting['scope.userLocation']) {
          vm.getUserLocation()
        } else if (userLocation.authSetting['scope.userLocation']) {
          wx.showModal({
            title: '',
            content: '请在系统设置中打开定位服务',
            showCancel: false,
            success: result => {
              if (result.confirm) {
                wx.navigateBack()
              }
            }
          })
        } else {
          wx.showToast({
            title: '授权失败',
            icon: 'none'
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 1500)
        }
      }
    })
  },
  //将经纬度转化为地理位置
  getLocat: function (lat, long) {
    var that = this
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: lat,
        longitude: long
      },
      success: function (res) {
        console.log(res);
        var cityStr = res.result.address_component.city.substring(0, res.result.address_component.city.substring.length)

        that.setData({
          city: cityStr,
        })

      },
      fail: function (res) {

      }
    })
  },
  //是否重新定位
  handleToPosition() {
    console.log('发现页重新定位')
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否重新定位',
      success: function (res) {
        if (res.confirm) {
          that.getUserLocation();
        } else if (res.cancel) {

        }
      }
    })
  }
})