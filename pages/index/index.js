//index.js
//获取应用实例
import  api from '../../apis/index.js';
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
    //纬度
    "latitude": "23.131970",
    //经度
    "longitude": "113.322670",
    //省份
    "province": '',
    //城市
    "city": '',
    //区县
    "district":'',
    //详细地址
    "street_number": '',
    //轮播图数据
    "bannerSwiper":[],
    //获取爆款优惠三公里
    "nearbyExplosive":[],
    //获取优惠精选
    "getForDiscount":[],
    //获取2公里范围内所有的优惠劵列表
    "getCouponFor2km":[]

  },
  onLoad: function () {
    var that = this;
    //获取地理位置
    qqmapsdk = new QQMapWX({
       key:'K6ABZ-32PR6-LXWSL-EZWDW-XC3NH-CYFC4'
    })
    // 刷新组件
    this.refreshView = this.selectComponent("#refreshView");
    //获取地理定位
    this.getUserLocation();
    //判断是否为全面屏
    this.checkFullSucreen();
    //限定商品描述的数据
    if(this.data.nearHotTit.length>34){
      this.setData({
        "nearHotTit": this.data.nearHotTit.substring(0, 33) + '...'
      })
     //获取轮播图
      api.handleToGetBanners().then(res=>{
          var data = res.data
          console.log(data)
          that.setData({
            "bannerSwiper": data
          })
      })
      //获取优惠精选
      api.getForDiscount().then(res=>{
        var title = res.data.title ;
        if (res.data.title.length>33){
          title = res.data.title.substring(0, 33) + '...'
        }
        title = title.replace(/【/g, '[ ');
        title = title.replace(/】/g,' ] ');
          var data = {
            "id":res.data.id,
            "head_img": res.data.head_img,
            "title": title
          };
         
          that.setData({
            "getForDiscount":data
          })
      })
     
      
    };






  },
  onReady:function(){
  },
  //跳转到详情页
  handleToDetails(res){
      wx.navigateTo({
        url: '../details/details?id='+res.currentTarget.id,
      })
  },
  //跳转到发现页好吃的
  handleToFoundGoodsFood(){
    app.globalData.goodsFood= true;
    app.globalData.changeBeatful=false;
    app.globalData.goToPaly=false;
    app.globalData.sonPlay=false;
        wx.switchTab({
          url: '../found/found'
        })
  },
  //变美的
  handleToFoundChangeBeatful(){
    app.globalData.goodsFood = false;
    app.globalData.changeBeatful = true;
    app.globalData.goToPaly = false;
    app.globalData.sonPlay = false;
    wx.switchTab({
      url: '../found/found'
    })
  },
  //出去浪
  handleToFoundGoToPaly(){
    app.globalData.goodsFood = false;
    app.globalData.changeBeatful =false;
    app.globalData.goToPaly = true;
    app.globalData.sonPlay = false;
    wx.switchTab({
      url: '../found/found'
    })
  },
  //宝贝玩
  handleToFoundSonPlay(){
    app.globalData.goodsFood = false;
    app.globalData.changeBeatful = false;
    app.globalData.goToPaly = false;
    app.globalData.sonPlay = true;
    wx.switchTab({
      url: '../found/found'
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
    var that = this;
    setTimeout(() => { 
        this.refreshView.stopPullRefresh() 
        //获取轮播图
        api.handleToGetBanners().then(res => {
          var data = res.data;
          that.setData({
            "bannerSwiper": data
          })
        })
      //获取优惠精选
      api.getForDiscount().then(res => {
        var title = res.data.title;
        if (res.data.title.length > 33) {
          title = res.data.title.substring(0, 33) + '...'
        }
        title = title.replace(/【/g, '[ ');
        title = title.replace(/】/g, ' ] ');
        var data = {
          "id": res.data.id,
          "head_img": res.data.head_img,
          "title": title
        };

        that.setData({
          "getForDiscount": data
        })
      })
        //获取爆款优惠(3公里内)
        api.getNearbyExplosive(that.data.latitude, that.data.longitude).then(res => {
          var data = res.data;
          for (var i = 0, len = data.length; i < len; i++) {
            if (data[i].title.length > 33) {
              data[i].title = data[i].title.substring(0, 33) + '...'
            }
            data[i].title = data[i].title.replace(/【/g, ' [ ');
            data[i].title = data[i].title.replace(/】/g, ' ] ');
          }
          that.setData({
            "nearbyExplosive": data
          })
        })
      //获取两公里所有优惠券
      api.getCouponFor2km(that.data.latitude, that.data.longitude).then(res => {
        var data = res.data
        for (var i = 0, len = data.length; i < len; i++) {
          if (data[i].title.length > 33) {
            data[i].title = data[i].title.substring(0, 33) + '...'
          }
          data[i].title = data[i].title.replace(/【/g, ' [ ');
          data[i].title = data[i].title.replace(/】/g, ' ] ');
        }
        that.setData({
          "getCouponFor2km": data
        })
      })

    }, 3000)
  },
  //上拉触底事件
  onReachBottom:function(){
    // wx.showLoading({
    //   title: '加载中',
    // })
    // setTimeout(function(){
    //   wx.hideLoading()

    // },1000)
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
    let that = this
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
                that.getLocat(that.data.latitude,that.data.longitude)
                setTimeout(() => {
                  wx.navigateBack()
                }, 1500)
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    // console.log('dataAu:success', dataAu)
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      //再次授权，调用wx.getLocation的API
                      that.getLocation(dataAu)
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none'
                      })
                      that.getLocat(that.data.latitude, that.data.longitude)
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
          that.getLocation(res)
        }
        // 已授权
        else if (res.authSetting['scope.userLocation']) {
          // console.log('authSetting:status:已授权', res.authSetting['scope.userLocation'])
          //调用wx.getLocation的API
          that.getLocation(res)
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function (userLocation) {
    let that = this
    wx.getLocation({
      type: "wgs84",
      success: function (res) {
        // console.log('getLocation:success', res)
        var latitude = res.latitude;
        var longitude = res.longitude;
        that.data.latitude = latitude;
        that.data.longitude = longitude;
        that.getLocat(latitude, longitude);
      },
      fail: function (res) {
        // console.log('getLocation:fail', res)
        if (res.errMsg === 'getLocation:fail:auth denied') {
          wx.showToast({
            title: '拒绝授权',
            icon: 'none'
          })
          that.getLocat(that.data.latitude, that.data.longitude)
          setTimeout(() => {
            wx.navigateBack()
          }, 1500)
          return
        }
        if (!userLocation || !userLocation.authSetting['scope.userLocation']) {
          that.getUserLocation()
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
          that.getLocat(that.data.latitude, that.data.longitude)
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
    //获取爆款优惠(3公里内)
    api.getNearbyExplosive(lat,long).then(res => {
      var data = res.data;
      for (var i = 0, len = data.length; i < len; i++) {
        if (data[i].title.length > 33) {
          data[i].title = data[i].title.substring(0, 33) + '...'
        }
        data[i].title = data[i].title.replace(/【/g, ' [ ');
        data[i].title = data[i].title.replace(/】/g, ' ] ');
      }
      that.setData({
        "nearbyExplosive": data
      })
    })
    //获取两公里所有优惠券
    api.getCouponFor2km(lat,long).then(res => {
      var data = res.data
      for (var i = 0, len = data.length; i < len; i++) {
        if (data[i].title.length > 33) {
          data[i].title = data[i].title.substring(0, 33) + '...'
        }
        data[i].title = data[i].title.replace(/【/g, ' [ ');
        data[i].title = data[i].title.replace(/】/g, ' ] ');
      }
      that.setData({
        "getCouponFor2km": data
      })
    })
    qqmapsdk.reverseGeocoder({
      location:{
        latitude: lat,
        longitude:long
      },
      success:function(res){
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