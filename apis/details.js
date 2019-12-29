import _https from '../utils/request.js';
export default{
  handleGetDetial(id){
    var url ='/api/coupon/getDetial?id='+id;
    return _https.request(url);
  }
}