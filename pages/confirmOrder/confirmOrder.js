// pages/confirmOrder/confirmOrder.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "statusBarHeight": app.globalData.statusBarHeight * 2,
     "integrate":true,
     "num":'1',
     "shopPrice":"100.00",
     "activePrice":"48.00",
     "vipPrice":'3.00',
     "intergratePrice":'1.00',
     "count":"",
    //判断是否为全面屏
    "isFullSucreen": false 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkFullSucreen();
    var count = parseFloat(this.data.activePrice) * parseInt(this.data.num) - parseFloat(this.data.vipPrice) - parseFloat(this.data.intergratePrice);
    count = count + '.00';
    this.setData({
      "count":count
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
  //数量减
  handleNumJian(){
    var num = parseInt(this.data.num);
      if(num>1){
         num = num-1;
      }
    if (this.data.integrate) {
      var count = parseFloat(this.data.activePrice) * num - parseFloat(this.data.vipPrice) - parseFloat(this.data.intergratePrice);
      count= count+'.00'
      this.setData({
        "num": num,
        "count": count
      })
    }else{
      var count = parseFloat(this.data.activePrice) * num - parseFloat(this.data.vipPrice);
      count = count + '.00'
      this.setData({
        "num": num,
        "count": count
      })
    }
  },
  //数量加
  handleNumJia(){
    var num = parseInt(this.data.num);
     num=num+1;
    if (this.data.integrate){
      var count = parseFloat(this.data.activePrice) * num - parseFloat(this.data.vipPrice) - parseFloat(this.data.intergratePrice);
      count = count + '.00'
      this.setData({
        "num": num,
        "count": count
      })
    }else{
      var count = parseFloat(this.data.activePrice) * num - parseFloat(this.data.vipPrice);
      count = count + '.00'
      this.setData({
        "num": num,
        "count": count
      })
    }
  },
  //图片切换
  handleToImage(){
    var integrate = this.data.integrate;
    if (integrate===true){
      var count = parseFloat(this.data.activePrice) * parseInt(this.data.num ) - parseFloat(this.data.vipPrice);
      count = count + '.00'
      this.setData({
        "count": count,
        "integrate": false
      })
    }else{
      var count = parseFloat(this.data.activePrice) * parseInt(this.data.num) - parseFloat(this.data.vipPrice) - parseFloat(this.data.intergratePrice);
      count = count + '.00'
      this.setData({
        "integrate": true,
        "count": count
      })
    }

  },
  //返回
  handleToBack(){
    wx.navigateBack({})
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