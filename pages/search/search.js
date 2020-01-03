// pages/search/search.js
import api  from '../../apis/search.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "statusBarHeight": app.globalData.statusBarHeight ,
    "searchTop": app.globalData.statusBarHeight * 2+220,
    "inputVal":"",
    "placeholder":"今天想去哪里吃喝玩乐",
    "clear":false,
    "hotSearch":[],
    "searchHist":[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    api.handelGetSerachkeys().then((res)=>{
        console.log(res);
        that.setData({
          "hotSearch":res.data
        })
    })
    wx.getStorage({
      key: 'searchHist',
      success: function(res) {
          that.setData({
            "searchHist":JSON.parse(res.data)
          })
      },
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
  //路由返回
  handleToBack(){
      wx.navigateBack({
        url:'../found/found'
      })
  },
  //得焦时
  handleTofocus(){
      this.setData({
        "placeholder": "",
      })
  },
  //隐藏input
  handleToSearchPlace(){
    this.setData({
      "inputVal": "",
      "placeholder": "今天想去哪里吃喝玩乐",
    })
    
  },
  handelToSearch(){
    var that =this;
    console.log(this.data.inputVal);
    var searchHist=[];
    searchHist=this.data.searchHist
    searchHist.unshift(this.data.inputVal);
    if(searchHist.length>6){
       searchHist=searchHist.splice(0,6)
    }
    this.setData({
      "searchHist":searchHist
    }) 
    wx.setStorage({
      key: 'searchHist',
      data: JSON.stringify(searchHist),
    })
    api.handelGetfindCoupon(this.data.inputVal).then((res)=>{
      console.log(res);
      if(res.data.length!=0){
          wx.navigateTo({
            url: '../searchResult/searchResult?searchVal='+that.data.inputVal,
          })
      }else{
          wx.showToast({
            image:'../../images/fail.png',
            title: '没有该种类型优惠劵',
          })
          setTimeout(()=>{
            wx.hideToast()
          },1000)
      };
    })
  },
  //得到input框中数据
  handleInputText(e){
    this.setData({
      "inputVal":e.detail.value,
      "clear":true,
    })
  },

  //清除value
  onToggle(e){
    this.setData({
      "inputVal": "",  
      "placeholder": "今天想去哪里吃喝玩乐",
    })
    
  },
  //清除历史
  handleToDelete(){
      this.setData({
        "searchHist":[]
      })
      wx.setStorage({
        key: 'searchHist',
        data: JSON.stringify([]),
      })
  }
})