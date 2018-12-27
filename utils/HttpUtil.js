var Constant = require('constant.js');
var baseUrl = Constant.BASEURL;
const http = ({url= '',param={}, ...other} = {}) => {
  wx.showLoading({
    title: '请求中，请耐心等待',
  })
  let timeStart = Date.now();
  return new Promise( (resolve,reject)=> {
    //console.log('传递过来的url',url,"参数",param);
    wx.request({
      url: getUrl(url),
      data: param,
      header: {
         'content-type': 'application/json' // 默认值 ,另一种是 "content-type": "application/x-www-form-urlencoded"
      },
      ...other,
      complete: (res) =>{
        wx.hideLoading();
        wx.stopPullDownRefresh();
        console.log(`耗时${Date.now() - timeStart}ms`);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data)
        } else {
          reject(res)
          
        }
      }
    })
  })
}

const getUrl = (url) => {
  if (url.indexOf('://') == -1) {
    url = baseUrl + url;
  }
  return url
}
// get方法
const doGet = (url, param = {}) => {
  return http({
    url,
    param
  })
}

const doPost = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'POST'
  })
}

const doPut = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'PUT'
  })
}

const doDelete = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'PUT'
  })
}

module.exports = {
  baseUrl,
  doGet,
  doPost,
  doPut,
  doDelete
}

// 一个页面多个请求
// Promise.all([
//   api.get('list'),
//   api.get(`detail/${id}`)
// ]).then(result => {
//   console.log(result)
// }).catch(e => {
//   console.log(e)
// })