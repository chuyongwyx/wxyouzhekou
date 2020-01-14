// pages/found/found.js
//获取应用实例
import api from '../../apis/found.js'
import apis from '../../apis/index.js'
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
    "bannerTop": app.globalData.statusBarHeight*2+240,
    // 筛选栏活跃状态
    "allFood":false,
    "near":false,
    "mind":false,
    //遮罩
    "mark":false,
    //滚动状态
    "scrollBefore":true,
    "scrollIng":false,
    //判断是否为全面屏
    "isFullSucreen": false,
    //定位
    "city":'',
    //纬度
    "latitude":'23.131970',
    //经度
    "longitude":'113.322670',
    //获取的分类的相应数据数据
     "kindsData":[], 
    //获取轮播图
     "binnerSwiper":[],
    //树形插件
      "kindsTreeData":[],
    //搜索关键字
      "key":"",
    //排序
      "sort":"",
    //附近几公里
      "nears":"",
    //搜索分类id
      "cateid":"",
    //全部美食
      "allfoodKinds":[1,1,1,1,1,1,1,1,1,1,1,1]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //树形插件
  //事件处理函数
  tapItem: function (e) {
    console.log('index接收到的itemid: ' + e.detail.itemid);
  },
  onLoad: function (options) {
      var that = this;
    //判断是否为全面屏
    this.checkFullSucreen();
    //获取地理位置
    qqmapsdk = new QQMapWX({
      key:'K6ABZ-32PR6-LXWSL-EZWDW-XC3NH-CYFC4'
    })
    //获取分类信息
    api.handleGetCategory().then((res) => {
      console.log(res.data);
      that.setData({
        "kindsTreeData": res.data
      })
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
    //获取轮播图
    var that=this;
    apis.handleToGetBanners().then((res) => {
      console.log(res.data);
        that.setData({
        "binnerSwiper": res.data
      })
    })
    //获取地理定位
    this.getUserLocation();
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
  //跳往详情页
  handleToDetails(res){
    console.log(res)
    wx.navigateTo({
      url: '../details/details?id='+res.currentTarget.id,
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
                that.getLocation()
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
        that.setData({
          "latitude": latitude,
          "longitude": longitude
        })
        that.getLocat(that.data.latitude, that.data.longitude);
      },
      fail: function (res) {
        that.getLocat(that.data.latitude, that.data.longitude);
      }
    })
  },
  //将经纬度转化为地理位置
  getLocat: function (lat,long) {
    var that = this;
    //判断是从哪个地方到found页面中来的
    //好吃的
    if (app.globalData.goodsFood) {
      api.handleGetfindCoupon(lat, long, '14').then((res) => {
        //console.log(res)
        that.setData({
          "kindsData": res.data
        })
        app.globalData.goodsFood = false;
      })
    }
    //变美的
    if (app.globalData.changeBeatful) {
      api.handleGetfindCoupon(lat, long, '16').then((res) => {
        console.log(res);
        that.setData({
          "kindsData": res.data
        })
        app.globalData.changeBeatful = false;
      })
    }
    //出去浪
    if (app.globalData.goToPaly) {
      api.handleGetfindCoupon(lat, long, '18').then((res) => {
        that.setData({
          "kindsData": res.data
        })
        app.globalData.goToPaly = false;
      })
    }
    //宝贝玩
    if (app.globalData.sonPlay) {
      api.handleGetfindCoupon(lat, long, '19').then((res) => {
        that.setData({
          "kindsData": res.data
        })
        app.globalData.sonPlay = false;
      })
    }
    //什么都没传
    if (app.globalData.goodsFood == false && app.globalData.changeBeatful == false && app.globalData.goToPaly == false && app.globalData.sonPlay == false) {
      api.handleGetfindCoupon(lat, long, '').then((res) => {
        console.log(res)
        that.setData({
          "kindsData": res.data
        })
      })
    }
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
  },

  //全部美食点击
  handleToAllFoods(){
    if (this.data.allFood==false){
      this.setData({
        "allFood":true,
        "near":false,
        "mind":false,
        "mark":true
      })
    }else{
      this.setData({
        "allFood": false,
        "mark":false
      })
    }
  },
  //附近点击
 handleToNears(){
   if (this.data.near == false) {
     this.setData({
       "allFood": false,
       "near": true,
       "mind": false,
       "mark":true
     })
   }else{
     this.setData({
       "near": false,
       "mark":false
     })
   }
 },
 //智能排序点击
 handleToMinds(){
   if (this.data.mind == false) {
     this.setData({
       "allFood": false,
       "near": false,
       "mind": true,
       "mark":true
     })
   } else {
     this.setData({
       "mind": false,
       "mark":false
     })
   }
 },
 //点击遮罩区域隐藏
  handleToMarkHide(){
    this.setData({
      "allFood": false,
      "near": false,
      "mind": false,
      "mark": false
    })
  }
})