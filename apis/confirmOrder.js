import _https from '../utils/request.js';

export default{
 
  //下单
  handleToAddOrder(id,num,isDeduct,token){
    var url = '/api/Order/addOrder?id=' + id + '&num=' + num + '&isDeduct=' + isDeduct+'&token='+token;
    // var url = '/api/Order/addOrder?id=' + id + '&num=' + num + '&isDeduct=' + isDeduct + '&token=%2BF6W%2BU91qzIEYiytcH0Nmw==';
    return _https.request(url);
  }
}