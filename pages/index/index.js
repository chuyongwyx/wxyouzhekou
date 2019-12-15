//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    "nearHotTit":'48元抵100元代金劵,无门槛使用 ,最多使用两张 ,40款串串任意的的撒娇的思考加速度',
    "posH":true,
    "scrollH":false,
    // 导航栏安全距离
    "statusBarHeight":app.globalData.statusBarHeight,
    "home":"../../images/dibulan_shouye1.png",
    "found":"../../images/dibulan_faxian2.png",
    "my":"../../images/dibulan_gerenzhongxin2.png",
    //判断是否为全面屏
    "isFullSucreen": app.globalData.isFullSucreen?true:false 
  },
  onLoad: function () {
    // 刷新组件
    this.refreshView = this.selectComponent("#refreshView");
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
       })
    }else{
      this.setData({
        "posH": true,
        "scrollH":false,
      })
    }
   
  },
  onPullDownRefresh: function () {
    setTimeout(() => { this.refreshView.stopPullRefresh() }, 5000)
  },
  //跳转个人中心
  handleToMy(){
    wx.reLaunch({
      url: '../my/my',
    })
  },
  //跳转到发现
  handleToFound(){
    wx.reLaunch({
      url: '../found/found',
    })
  }
})