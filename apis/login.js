import _https from '../utils/request.js';
export default {
  //获取token
  handleToLogin(code) {
    var url = '/api/User/wxLogin?code='+code;
    return _https.request(url);
  },
  //手机号解密
  handleToTellNum(en, iv,code){
    console.log(code)
    var url ='/api/User/decryptPhone?encryptedData='+en+'&iv='+iv+'&code='+code;
    return _https.request(url)  
  },
  //上传用户信息
  handleSaveUserInfo(token,wxdata){
    var url = '/api/User/saveUserInfo?token=' + token + '&wxdata='+ wxdata
    return _https.request(url);
  }
}