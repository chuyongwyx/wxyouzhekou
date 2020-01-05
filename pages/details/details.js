// pages/details/details.js
import api  from '../../apis/details.js';
import apis from "../../apis/login.js"
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "statusBarHeight": app.globalData.statusBarHeight,
    //判断是否为全面屏
    "isFullSucreen":false,
    "joinGroup":false,
    "share":false,
    "imagePath":"", 
    "detailInfo":{},
    "template":{},
    "id":""
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      "id":options.id
    })
    //判断是否为全面屏
    this.checkFullSucreen();
    //获取详情信息
    console.log(options)
    wx.getStorage({
      key: 'token',
      success: function(res) {
          api.handleGetDetial(options.id,res.data).then((res)=>{
            console.log(res)
                that.setData({
                     "detailInfo": res.data
                })
          })

      },
      fail:function(){
        api.handleGetDetial(options.id,'').then((res) => {
          console.log(res.data);
          that.setData({
            "detailInfo": res.data
          })
        })
      }
    })
    //登录是否过期
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
    
    //生成海报

  },
  handleToBack(){
    wx.navigateBack({})
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
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      var that = this
      return {
        title: '分享给好友',
        imageUrl: that.data.imagePath,
        success: function (res) {
          var shareTickets = res.shareTickets;
          that.setData({
            "share":false
          })
        },
        fail: function (res) {
          // 转发失败
          console.log("转发失败:" + JSON.stringify(res));
        }
      }
    }
    
  },
  // 返回
  handleBack(){
    wx.navigateBack({})
  },
  //前往首页
  handleToHome(){
    wx.reLaunch({
      url: '../index/index'
    })
  },
  //前往订单页
  handleToConfirmOrder(){
    wx.navigateTo({
      url: '../order/order',
    })
  },
  //前往确认订单页
  handleToBuy(resId){
    if (this.data.detailInfo.unBuyReason){
          //判断用户不能购买原因
          if (this.data.detailInfo.unBuyReason == '没有登陆！') {
            wx.showModal({
              title: '',
              content: '您还没有登录,跳转到个人中心登录',
              success: (res) => {
                if (res.cancel) {

                } else {
                  wx.switchTab({
                    url: '../my/my',
                  })
                }
              },
              fail: () => {

              }
            })
          } else {
            wx.showLoading({
              title: this.data.detailInfo.unBuyReason,
            })
          }
      }else{
          //判断用户有没有权限
          
        if (this.data.detailInfo.buyAccess){
            //有权限
            console.log(resId);
            console.log('有权限')
            wx.navigateTo({
              url: '../confirmOrder/confirmOrder?id='+resId.currentTarget.id,
            })
        }else{
           //无权限
           console.log('没有权限')
           wx.showLoading({
             title: '没有权限',
           })
           setTimeout(()=>{
              wx.hideLoading()
           },1000)
        }

      }
   
   
  },
  //隐藏加入群聊
  handleToClose(){
      this.setData({
        "joinGroup":false
      })
  },
  //显示加入群聊
  handleToShow(){
     this.setData({
       "joinGroup":true
     })
  },
  //海报图
  onImgOK(e) {
    this.imagePath = e.detail.path;
    this.setData({
      "imagePath": this.imagePath
    })
  },
  //保存给海报图
  handleToSave(){
    var that = this;
    wx.saveImageToPhotosAlbum({
      filePath: this.imagePath,
      success:function(res){
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1000,
          success:function(){
            that.setData({
              "share": false,
              "imagePath":''
            })
          }
        });
      }
    });
  },



  //分享界面点击生成图片
  handleToShareHaibao(res){
    var that = this;
    wx.login({
      success: function (resCode) {
        apis.handleToLogin(resCode.code).then((resLogin) => {
  
          if (resLogin.code == 1) {
          
            wx.setStorage({
              key: "userImage",
              data: res.detail.userInfo.avatarUrl
            })
            wx.setStorage({
              key: "userName",
              data: res.detail.userInfo.nickName
            })
            wx.setStorage({
              key: 'token',
              data: resLogin.data.token,
            })
        api.handleGetDetial(that.data.id,resLogin.data.token).then((resData) => {
            console.log(res)
            that.setData({
              "detailInfo": resData.data
            })
          })
            var haibao = {
              width: '650rpx',
              height: '938rpx',
              background: '#fff',
              borderRadius: '12rpx',
              views: [
                {
                  type: 'image',
                  url: that.data.detailInfo.shareImg,
                  css: {
                    top: '40rpx',
                    left: '42rpx',
                    right: '42rpx',
                    width: '566rpx',
                    height: '690rpx',

                  }
                },
                {
                  type: 'image',
                  url: res.detail.userInfo.avatarUrl,
                  css: {
                    width: '108rpx',
                    height: '108rpx',
                    borderRaius: '54rpx',
                    top: '760rpx',
                    left: '42rpx',
                  }
                },
                {
                  type: "text",
                  text: res.detail.userInfo.nickName,
                  css: {
                    height: '42rpx',
                    fontSize: '30rpx',
                    fontFamily: 'PingFangSC-Medium, PingFang SC',
                    fontWeight: 500,
                    color: 'rgba(51, 51, 51, 1)',
                    lineHeight: '42rpx',
                    top: '770rpx',
                    left: '170rpx'
                  }
                },
                {
                  type: 'text',
                  text: '推荐语推荐语',
                  css: {
                    fontSize: '30rpx',
                    color: 'rgba(255, 116, 20, 1)',
                    lineHeight: '42rpx',
                    top: '812rpx',
                    left: '170rpx'
                  }
                },
                {
                  type: "text",
                  text: '长按立即购买',
                  css: {
                    fontSize: '22rpx',
                    fontFamily: 'PingFangSC-Medium, PingFang SC',
                    fontWeight: '500',
                    color: 'rgba(150, 150, 150, 1)',
                    lineHeight: '32rpx',
                    top: '864rpx',
                    left: '170rpx'
                  }
                },
                {
                  type: 'qrcode',
                  content: '',
                  css: {
                    top: '760rpx',
                    right: '42rpx',
                    borderWidth: '2rpx',
                    width: '126rpx',
                    height: '126rpx',
                    borderColor: 'rgba(216, 216, 216, 1)',
                    padding: '14rpx'
                  },
                },
              ]
            }
            that.setData({
              "share": true,
              "template": haibao
            });
            //上传信息
            apis.handleSaveUserInfo(resLogin.data.token, JSON.stringify(res.detail)).then((res) => {
            })

          } else {
            wx.showToast({
              title: '登录异常，授权失败',
              icon: 'none',
              duration: 3000
            })
          }

        })
      },
      fail: function () {

      }
    })

    wx.showToast({
      title: '生成中...',
      icon: 'loading',
      duration: 1000
    });
    setTimeout(function () {
      wx.hideToast()
     
    }, 1000)
    },
  //发送给朋友
  handleToFriend(){
    wx.showShareMenu({
      withShareTicket:true,
      success:function(res){
          console.log(res)
      }
    })
     this.setData({
       "share":false,
       "imagePath": "",
     })
  },
  //海报隐藏
  handleToHaibaoHide(){
      this.setData({
        "share": false, 
        "imagePath":"",
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
  },
  //拨打电话
  handleToCall(e){
    console.log(e);
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.id,
    })
  },
  //打开地图
  handleToOpenMap(){
    var that = this;
    wx.showLoading({
      title: '地图打开中',
    })
    console.log(that.data.detailInfo.lat);
    console.log(that.data.detailInfo.lng);
    wx.openLocation({
      latitude: parseFloat(that.data.detailInfo.lat),
      longitude: parseFloat(that.data.detailInfo.lng),
      success:function(res){
          console.log(res);
          wx.hideLoading();
      }
    })
  },
  //图片预览
  handleToImageShow(){
    var that = this;
    var url =[];
    var licenses = that.data.detailInfo.licenses;
    for (var i = 0, len = licenses.length;i<len;i++){
      url.push(licenses[i].url)
    }
      wx.showLoading({
        title: '加载中',
      })
      wx.previewImage({
        urls:url,
        success:function(res){
           wx.hideLoading()
        }
      })
  }
})