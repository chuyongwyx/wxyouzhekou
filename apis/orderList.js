import _https from '../utils/request.js';
export default{
  handleOrderList(token){
    // var url ='/api/Order/orderList?token='+token;
    console.log(token);
    var url = '/api/Order/orderList?token=%2BF6W%2BU91qzIEYiytcH0Nmw==';
    return _https.request(url);
  },
  //订单的初始化数据
  handleConfirmOrder(id, token) {
    // var url = "/api/Order/orderList?id=" + id + '&token=' + token;
    var url = "/api/Order/orderDetail?id=" + id +'&token=%2BF6W%2BU91qzIEYiytcH0Nmw==';
    return _https.request(url)
  },
}