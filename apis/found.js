import _https from '../utils/request.js';
export default {
  //按照条件搜索优惠劵
  handleGetfindCoupon(lat,lng,id) {
    var url;
    if(id!=''){
      url = '/api/Index/getfindCoupon?lat=' + lat + '&lng=' + lng +'&cateid='+id;
    }else{
      url = '/api/Index/getfindCoupon?lat=' + lat + '&lng='+lng
    }
    return _https.request(url);
  },
  //获取搜索分类
  handleGetCategory(){
    var url ='/api/Coupon/getCategory';
    return _https.request(url);
  }
}