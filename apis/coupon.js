import _https from '../utils/request.js';
export default{
    //优惠劵列表
    handleCoupon(token,status){
      var url;
       if(status==0){
         url = '/api/Coupon/getMyCoupon?token='+token
      }else{
         var url = '/api/Coupon/getMyCoupon?token='+token+'&status='+status;
        //  url = '/api/Coupon/getMyCoupon?token=%2BF6W%2BU91qzIEYiytcH0Nmw==&status=' + status;
      }
      return _https.request(url)
    },
    //优惠券详情
  handleCouponToUse(id,token){
    var url ='/api/Coupon/couponToUse?id='+id+'&token='+token
    // var url = '/api/Coupon/couponToUse?id=' + id + '&token=%2BF6W%2BU91qzIEYiytcH0Nmw==' ;
    return _https.request(url)
  }
}