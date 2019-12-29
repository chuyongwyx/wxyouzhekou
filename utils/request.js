/**
 * 统一调用接口
 */
const apiHost ="https://yzdtest.189goo.cn";
function request(url,token,method,data) {
  return new Promise((resolve, reject) => {
    wx.showLoading({ title: '加载中...', duration: 6000 })
    wx.request({
      url: apiHost + url,
      data: data || {},
      header: {
        'Content-Type': 'x-www-form-urlencoded;charset=UTF-8',
      },
      method: method || 'GET',
      dataType: 'json',
      responseType: 'text',
      success: res => {
        wx.hideLoading()
        let statusCode = res.code
        if (statusCode =1) {
          resolve(res.data)
        } else {
          reject(res)
        }
      },
      fail: res => {
        wx.hideLoading()
        wx.showToast({
          title: '网络异常，请检查网络状态',
          icon: 'none',
          duration: 3000
        })
        reject(res)
      },
    })
  })
}

export default{
  request
}