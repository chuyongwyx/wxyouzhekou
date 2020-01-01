import _https from '../utils/request.js';
export default{
  handleGetDetial(id,token){
    var url;
    if(token!=''){
      url = '/api/coupon/getDetial?id='+id+'&token='+token;
    }else{
      url = '/api/coupon/getDetial?id=' + id
    }
 
   return _https.request(url);
  }
}