import _https from '../utils/request.js';

export default{
    //获取轮播图
    handleToGetBanners(){
      var url ='/api/index/getIndexBanner';
      return _https.request(url);
    }, 
    //获取爆款三公里
    getNearbyExplosive(lat,lng){
      var url = '/api/index/getNearbyExplosive?lat='+lat+'&lng='+lng;
      return  _https.request(url);
    },
    //获取优惠精选
    getForDiscount(){
      var url ='/api/Index/getForDiscount' ;
      return _https.request(url)
    },
    //获取两公里所有优惠
  getCouponFor2km(lat, lng){
      var url ='/api/index/getCouponFor2km?lat='+lat+'&lng='+lng;
      return _https.request(url)
    }

}
