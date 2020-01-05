import _https from '../utils/request.js';
export default{
  //获取优惠劵用于下单
  handleGetCoupDetlToAddOrder(id){
    var url ='/api/Coupon/getCoupDetlToAddOrder?id='+id;
    return _https.request(url);
  },
  //获取订单列表
  handleOrderList(token){
    var url ='/api/Order/orderList?token='+token;
    // var url = '/api/Order/orderList?token=%2BF6W%2BU91qzIEYiytcH0Nmw==';
    return _https.request(url);
  },
  //订单的详情
  handleConfirmOrder(id,token) {
    var url = "/api/Order/orderDetail?id="+id+'&token='+token;
    // var url = "/api/Order/orderDetail?id=" + id +'&token=%2BF6W%2BU91qzIEYiytcH0Nmw==';
    return _https.request(url)
  },
}