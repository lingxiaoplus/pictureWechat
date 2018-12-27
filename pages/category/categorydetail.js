// pages/category/categorydetail.js
var HttpUtil = require('../../utils/HttpUtil.js');
var UIUtil = require('../../utils/UIUtil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    typed:'',
    imageInfo:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.categoryId,
      typed: options.typed,
    })
    if (options.title){
      wx.setNavigationBarTitle({
        title: options.title,
      })
    }
    imageList = [];
    getDetails(this, this.data.id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    imageList = [];
    skip = 0;
    getDetails(this,this.data.id);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    skip += 30;
    console.log(skip)
    getDetails(this, this.data.id);
  },
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onImageClick: function (e) {

    var index = e.currentTarget.dataset.id;
    //var targetUrl = "/pages/image/image";
    let targetUrl = [];
    console.log(imageList[index])
    for (var i = 0; i < imageList.length; i++){
      targetUrl.push(imageList[i].img);
    }
    wx.previewImage({
      current: targetUrl[index].img,
      urls: targetUrl,
    })
    // if (imageList[index].img != null)
    //   targetUrl = targetUrl + "?url=" + imageList[index].img;
    // wx.navigateTo({
    //   url: targetUrl
    // });
  }
})

var skip = 0;
var limit = 30;
var imageList = [];
function getDetails(that,id){
  HttpUtil.doGet('http://service.picasso.adesk.com/v1/wallpaper/' + that.data.typed + '/' + id + '/wallpaper?limit=' + limit + '&skip=' + skip)
  .then(res=>{
    imageList = imageList.concat(res.res.wallpaper)
    that.setData({
      imageInfo: imageList,
    })
    if (imageList.length < 1) {
      UIUtil.showTextToast('获取到的数据为空');
    }
  }).catch(e=>{
    console.log('系统错误',e)
  })
}