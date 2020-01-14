import _https from '../utils/request.js';
export default{
  handleGetDetial(id,token){
    var url;
    if(token!=''){
      url = '/api/coupon/getDetial?id='+id+'&token='+token;
      // url = '/api/coupon/getDetial?id=' + id + '&token=%2BF6W%2BU91qzIEYiytcH0Nmw=='
    }else{
      url = '/api/coupon/getDetial?id=' + id
    }
 
   return _https.request(url);
  },
  //分享小程序码
  handleGetShareCode(token,scene){
    var url ='/api/index/getShareCode?token='+token+'&scene='+scene;
    console.log(url)
    return _https.request(url);  
    
    }

}