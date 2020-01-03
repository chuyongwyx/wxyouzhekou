import _https from '../utils/request.js';
export default{
  //热搜词
  handelGetSerachkeys(){
    var url = '/api/Index/getSerachkeys'
    return _https.request(url)
  },
  //搜索
  handelGetfindCoupon(key){
    var url ='/api/Index/getfindCoupon?key='+key;
    return _https.request(url)
  }
}