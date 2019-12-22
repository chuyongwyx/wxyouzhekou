//index.js
//获取应用实例
var QQMapWX = require('../../common/js/qqmap-wx-jssdk.min.js');
var qqmapsdk;
const app = getApp()
Page({
  data: {
    "nearHotTit":'48元抵100元代金劵,无门槛使用 ,最多使用两张 ,40款串串任意的的撒娇的思考加速度',
    "posH":true,
    "scrollH":false,
    //顶部栏线
    "headBorder":false,
    // 导航栏安全距离
    "statusBarHeight":app.globalData.statusBarHeight,
    "home":"../../images/dibulan_shouye1.png",
    "found":"../../images/dibulan_faxian2.png",
    "my":"../../images/dibulan_gerenzhongxin2.png",
    //判断是否为全面屏
    "isFullSucreen": false,
    //经度
    latitude: "",
    //纬度
    longitude: "",
    //省份
    province: '',
    //城市
    city: '',
    //区县
    district:'',
    //详细地址
    street_number: ''
  },
  onLoad: function () {
    //获取地理位置
    qqmapsdk = new QQMapWX({
      // key:'K6ABZ-32PR6-LXWSL-EZWDW-XC3NH-CYFC4'
      key:'DVOBZ-TSTLP-GL5DM-LPUM4-RNRLE-KTFFZ'
    })
    // 刷新组件
    this.refreshView = this.selectComponent("#refreshView");
    //获取地理定位
    this.getUserLocation();
    //判断是否为全面屏
    this.checkFullSucreen();
    if(this.data.nearHotTit.length>34){
      this.setData({
        "nearHotTit": this.data.nearHotTit.substring(0, 33) + '...'
      })
     
    } 
  },
  //跳转到详情页
  handleToDetails(e){
      wx.navigateTo({
        url: '../details/details',
      })
  },
  //触摸开始
  handletouchstart: function (event) {
    this.refreshView.handletouchstart(event)
  },
  //触摸移动
  handletouchmove: function (event) {
    this.refreshView.handletouchmove(event)
  },
  //触摸结束
  handletouchend: function (event) {
    this.refreshView.handletouchend(event)
  },
  //触摸取消
  handletouchcancel: function (event) {
    this.refreshView.handletouchcancel(event)
  },
  //页面滚动
  onPageScroll: function (event) {
    this.refreshView.onPageScroll(event);
    if(event.scrollTop>568){
       this.setData({
         "posH": false,
         "scrollH": true,
         "headBorder":true
       })
    }else{
      this.setData({
        "posH": true,
        "scrollH":false,
        "headBorder":false
      })
    }
   
  },
  onPullDownRefresh: function () {
    setTimeout(() => { this.refreshView.stopPullRefresh() }, 5000)
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
              "isFullSucreen":true
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
      location:{
        latitude: lat,
        longitude:long
      },
      success:function(res){
        console.log(res);
        var cityStr =res.result.address_component.city.substring(0, res.result.address_component.city.substring.length)
        
        that.setData({
          city: cityStr,
          district: res.result.address_component.district,
          street_number: res.result.address_component.street_number
        }) 
      
      },
      fail:function(res){

      }
    }) 
  },
  //是否重新定位
  handleToPosition(){
    var that =this;
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