import _https from '../utils/request.js';

export default{
 
  //下单
  handleToAddOrder(id, num, isDeduct, token,shareData){
    var url;
    if(shareData){
      url = '/api/Order/addOrder?id=' + id + '&num=' + num + '&isDeduct=' + isDeduct + '&token=' + token + '&shareData=' + shareData;
    }else{
      url = '/api/Order/addOrder?id=' + id + '&num=' + num + '&isDeduct=' + isDeduct + '&token=' + token; 
    }
    return _https.request(url);
  }
}