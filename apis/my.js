import _https from '../utils/request.js';
export default{
    //获取个人中心资料
    handleToMyCenter(token){
      var url = '/api/User/getUserCenter?token='+token;
      // var url ='/api/User/getUserCenter?token=%2BF6W%2BU91qzIEYiytcH0Nmw==';
      return _https.request(url)
    },
    //获取收支记录
  handleGetBudgetRecord(token,type){
    var url ='';
    if(type==''){
      url = '/api/User/getBudgetRecord?token='+token
      //  url = '/api/User/getBudgetRecord?token=%2BF6W%2BU91qzIEYiytcH0Nmw==';
     
    }else{
      url ='/api/User/getBudgetRecord?token='+token+'&type='+type;
      // url = '/api/User/getBudgetRecord?token=%2BF6W%2BU91qzIEYiytcH0Nmw=='+ '&type=' + type;
    }
    return _https.request(url)
   
  },
  //申请提现
  handleforWithdrawa(token,price){
    var url ='/api/User/forWithdrawal?token='+token+'&price='+price;
    // var url = '/api/User/forWithdrawa?token=%2BF6W%2BU91qzIEYiytcH0Nmw=='+'&price=' + price;
    return _https.request(url)    
  }
}