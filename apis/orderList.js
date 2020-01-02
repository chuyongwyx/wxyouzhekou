import _https from '../utils/request.js';
export default{
  handleOrderList(token){
    var url ='/api/Order/orderList?token='+token
    return _https.request(url);
  }
}