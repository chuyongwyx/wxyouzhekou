//app.js
var QQMapWX = require('common/js/qqmap-wx-jssdk.min.js');
var qqmapsdk;
App({
  onLaunch: function (e) {
      //判断设备是否为全面屏
    this.checkFullSucreen();
    //获取地理定位
    this.getUserLocation();
    qqmapsdk =new QQMapWX({
      key:'K6ABZ-32PR6-LXWSL-EZWDW-XC3NH-CYFC4'
    })
  },
  globalData: {
    statusBarHeight:wx.getSystemInfoSync()['statusBarHeight'],
    //当前设备为非全面屏
    isFullSucreen: false,
    //经度
    latitude:"",
    //纬度
    longitude:"",
    //省份
    province:'',
    //城市
    city:'',
    //详细地址
    address:''
    

  },
  checkFullSucreen: function () {

    const self = this

    wx.getSystemInfo({

      success: function (res) {
          console.log(res)
        // 根据 屏幕高度 进行判断
        if (res.screenHeight - res.windowHeight - res.statusBarHeight - 32 > 72) {

          self.globalData.isFullSucreen = true;
          
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
        vm.globalData.latitude = latitude;
        vm.globalData.longitude = longitude;
        console.log(vm.globalData.latitude, vm.globalData.longitude)
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
  getLocat:function(latitude,longitude){
    console.log(latitude, longitude)
        let vm = this;
        qqmapsdk.reverseGeocoder({
          location:{
            latitude:latitude,
            longitude:longitude
          },
          success: function (res) {
              console.log(res);
           },
          fails:function(res){
              console.log(res)
          }
        })
        
  }
})