import _https from '../utils/request.js';
export default {
  //获取token
  handleToLogin(code) {
    var url = '/api/User/wxLogin?code='+code;
    return _https.request(url);
  },
  //手机号解密
  handleToTellNum(en, iv,token){
    var url ='/api/User/decryptPhone?encryptedData='+en+'&iv='+iv+'&token='+token;

    return _https.request(url)  
  }
}