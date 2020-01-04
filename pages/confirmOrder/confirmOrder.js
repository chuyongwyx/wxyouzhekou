// pages/confirmOrder/confirmOrder.js
import api from "../../apis/confirmOrder.js";
import apis from '../../apis/orderList.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "statusBarHeight": app.globalData.statusBarHeight ,
      //是否使用积分
     "integrate":true,
     //数量
     "num":'1',
     "shopPriceAll":"",
     "count":"",
    //判断是否为全面屏
    "isFullSucreen": false,
    //商品id
    "shopId":'', 
    "shopInfo":{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    this.setData({
       "shopId":options.id
    })
    apis.handleGetCoupDetlToAddOrder(options.id).then((res)=>{
        that.setData({
          "shopInfo":res.data,
          "shopPriceAll": res.data.sellprice
        })
      var count = parseFloat(res.data.sellprice) * parseInt(this.data.num) - parseFloat(res.data.deductPrice);
      count = count + '.00';
      this.setData({
        "count": count
      })
    })


    this.checkFullSucreen();
  
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
      var count = parseFloat(this.data.shopInfo.sellprice) * num - parseFloat(this.data.shopInfo.deductPrice);
      count= count+'.00'
      this.setData({
        "num": num,
        "count": count,
        "shopPriceAll": parseFloat(this.data.shopInfo.sellprice) * num+'.00'
      })
    }else{
      var count = parseFloat(this.data.shopInfo.sellprice) * num 
      count = count + '.00'
      this.setData({
        "num": num,
        "count": count,
        "shopPriceAll": parseFloat(this.data.shopInfo.sellprice) * num+'.00'
      })
    }
  },
  //数量加
  handleNumJia(){
    var num = parseInt(this.data.num);
     num=num+1;
    if (this.data.integrate){
      var count = parseFloat(this.data.shopInfo.sellprice) * num - parseFloat(this.data.shopInfo.deductPrice);
      count = count + '.00'
      this.setData({
        "num": num,
        "count": count,
        "shopPriceAll": parseFloat(this.data.shopInfo.sellprice) * num+'.00'
      })
    }else{
      var count = parseFloat(this.data.shopInfo.sellprice) * num 
      count = count + '.00'
      this.setData({
        "num": num,
        "count": count,
        "shopPriceAll": parseFloat(this.data.shopInfo.sellprice) * num+'.00'
      })
    }
  },
  //图片切换
  handleToImage(){
    var integrate = this.data.integrate;
    if (integrate===true){
      var count = parseFloat(this.data.shopInfo.sellprice) * parseInt(this.data.num);
      count = count + '.00'
      this.setData({
        "count": count,
        "integrate": false,
        "shopPriceAll": parseFloat(this.data.shopInfo.sellprice) * parseInt(this.data.num)
      })
    }else{
      var count = parseFloat(this.data.shopInfo.sellprice) * parseInt(this.data.num) - parseFloat(this.data.shopInfo.deductPrice);
      count = count + '.00'
      this.setData({
        "integrate": true,
        "count": count,
        "shopPriceAll": parseFloat(this.data.shopInfo.sellprice) * parseInt(this.data.num)
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
  },
  //立即购买
  handleRightBuy(){
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function(resToken) {
        api.handleToAddOrder(that.data.shopId, that.data.num, that.data.integrate, resToken.data).then((res)=>{
            console.log(res);
            wx.showToast({
              title: '购买成功',
            })
            setTimeout(()=>{
                wx.navigateBack({})
            },1000)
            
        })
      },
    })
  }
})