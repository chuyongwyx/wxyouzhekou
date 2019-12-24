// pages/details/details.js
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
    "template":{
          width:'650rpx',
          height:'938rpx',
          background:'#fff',
          borderRadius:'12rpx',
          views:[
            {
              type:'image',
              url:'../../images/moni8.jpg',
              css:{
                  top:'40rpx',
                  left:'42rpx',
                  right:'42rpx',
                  width:'566rpx',
                  height:'690rpx',
                 
              }
            },
            {
               type:'image',
              url:'../../images/gerenzhongxin_morentouxiang.png',
              css:{
                    width:'108rpx',
                    height:'108rpx',
                    borderRaius:'100%',
                    top:'760rpx',
                    left:'42rpx',
              } 
            },
            {
                type:"text",
                text:'马建宇',
                css:{
                  height: '42rpx',
                  fontSize: '30rpx',
                  fontFamily: 'PingFangSC-Medium, PingFang SC',
                  fontWeight: 500,
                  color: 'rgba(51, 51, 51, 1)',
                  lineHeight: '42rpx',
                  top:'770rpx',
                  left:'170rpx'
                }                        
            },
            {
              type:'text',
              text:'推荐语推荐语',
              css:{
                fontSize: '30rpx',
                color: 'rgba(255, 116, 20, 1)',
                lineHeight: '42rpx',
                top: '812rpx',
                left: '170rpx'
              }
            },
            {
              type:"text",
              text:'长按立即购买',
              css:{
                fontSize: '22rpx',
                fontFamily: 'PingFangSC-Medium, PingFang SC',
                fontWeight: '500',
                color: 'rgba(150, 150, 150, 1)',
                lineHeight: '32rpx',
                top:'864rpx',
                left:'170rpx'
              }
            },
            {
              type: 'qrcode',
              content:'',
              css: {
                top: '760rpx',
                right: '42rpx',
                borderWidth: '2rpx',
                width: '126rpx',
                height: '126rpx',
                borderColor: 'rgba(216, 216, 216, 1)',
                padding:'14rpx'
              },
            },
          ]
    }
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断是否为全面屏
    this.checkFullSucreen();
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
    console.log(this.data.imagePath)
    if (ops.from === 'button') {
      var that = this
      return {
        title: '分享给好友',
        imageUrl: that.data.imagePath,
        success: function (res) {
          console.log('发送成功')
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
      url: '../confirmOrder/confirmOrder',
    })
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
  handleToShareHaibao(){
    var that = this;
    wx.showToast({
      title: '生成中...',
      icon: 'loading',
      duration: 1000
    });
    setTimeout(function () {
      wx.hideToast()
      that.setData({
        share: true
      });
    }, 1000)
    },
  //发送给朋友
  handleToFriend(){
     this.setData({
       "share":false
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
  }
})