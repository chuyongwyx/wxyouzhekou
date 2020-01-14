// pages/details/details.js
import api  from '../../apis/details.js';
import apis from "../../apis/login.js";
import base64 from "../../utils/base64.js";
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
    "id":"",
    "codeMa":"",
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    if (options.id) {
      this.setData({
        "id": options.id
      })
    }else{
      if (options.scene) {
        var strBase64 = base64.base64_decode(decodeURIComponent(options.scene))
       var strBase64Two = JSON.parse(strBase64);
        console.log(strBase64)
        wx.setStorage({
          key: 'strBase64',
          data: options.scene,
        })
        wx.setStorage({
          key: 'user_id',
          data: strBase64Two.u,
        })
        wx.setStorage({
          key: 'coupon_id',
          data: strBase64Two.c,
        })
        this.setData({
          "id": strBase64Two.c
        })
      }

      if (options.user_id) {
        wx.setStorage({
          key: 'user_id',
          data: options.user_id
        })
        wx.setStorage({
          key: 'coupon_id',
          data: options.coupon_id
        })
        this.setData({
          "id": options.coupon_id
        })
      }
     

    }
    
     

   
    //判断是否为全面屏
    this.checkFullSucreen();
    //获取详情信息
    wx.getStorage({
      key: 'token',
      success: function(res) {
          api.handleGetDetial(that.data.id,res.data).then((res)=>{
            console.log(res)
                that.setData({
                     "detailInfo": res.data
                })
          })

      },
      fail:function(){
        api.handleGetDetial(that.data.id,'').then((res) => {
          console.log(res.data);
          that.setData({
            "detailInfo": res.data
          })
        })
      }
    })
    //登录是否过期
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
    var that = this
    wx.getStorage({
      key: 'user_id',
      success: function(resUserId) {
        if (ops.from === 'button') {
          
          return {
            title: '分享给好友',
            path: "/pages/details/details?user_id="+resUserId.data +'&coupon_id='+that.data.id,
            imageUrl: that.data.imagePath,
            success: function (res) {
              that.setData({
                "share": false
              })
            },
            fail: function (res) {
              // 转发失败
              console.log("转发失败:" + JSON.stringify(res));
            }
          }
        }
      },
    })
   
    
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
            wx.setStorage({
              key: 'createTokenTime',
              data: resLogin.data.createTokenTime,
            })
            wx.setStorage({
              key: 'user_id',
              data: resLogin.data.user_id,
            })
        api.handleGetDetial(that.data.id,resLogin.data.token).then((resData) => {
            that.setData({
              "detailInfo": resData.data
            })
          })
       var haibao;
        wx.getStorage({
          key: 'user_id',
          success: function(resUserId) {
            var str = JSON.stringify({
              "u": resUserId.data ,
              "c": that.data.id
            })
            var strBase64 = base64.base64_encode(str);
            api.handleGetShareCode(resLogin.data.token,strBase64).then((resCodeMa) => {
              console.log(resCodeMa)
              console.log(that.data.detailInfo.shareImg)
              haibao = {
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
                      borderRadius: '54rpx',
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
                    text: '"有折打,精选优惠"',
                    css: {
                      fontSize: '30rpx',
                      color: 'rgba(255, 116, 20, 1)',
                      lineHeight: '42rpx',
                      top: '812rpx',
                      left: '166rpx'
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
                    type: 'rect',
                    css: {
                      top: '760rpx',
                      right: '42rpx',
                      borderWidth: '2rpx',
                      width: '116rpx',
                      height: '126rpx',
                      borderColor: 'rgba(216, 216, 216, 1)',
                      color: '#fff'
                    }
                  },
                  {
                    type: 'image',
                    url: resCodeMa.data,
                    css: {
                      top: '768rpx',
                      right: '45rpx',
                      width: '112rpx',
                      height: '112rpx',
                    },
                  },
                ]
              }

              that.setData({
                "share": true,
                "template": haibao
              });
            })
          },
        })
          //上传信息
        apis.handleSaveUserInfo(resLogin.data.token, res.detail.rawData).then((res) => {})

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