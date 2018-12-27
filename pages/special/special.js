// pages/special/special.js
var Constant = require('../../utils/constant.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageInfo: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '专辑',
    })
    getSpecial(this);
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
    skip = 0;
    imageList = [];
    getSpecial(this);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    skip += 30;
    getSpecial(this);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onItemClick: function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../category/categorydetail?categoryId=' + id + '&typed=album',
    })
  }
})

var skip = 0;
var imageList = [];
function getSpecial(that){
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: Constant.SPECIAL_URL + skip,
    method: 'GET',
    success: function(res){
      console.log(res.data)
      imageList = imageList.concat(res.data.res.album)
      for(var i=0;i<imageList.length;i++){
        var timeFormate = formatTime(imageList[i].atime,"Y-M-D");
        imageList[i].atime = timeFormate;
      }
      that.setData({
        imageInfo: imageList,
      })
    },
    complete: function(){
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }
  })
}

//数据转化
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 时间戳转化为年 月 日 时 分 秒
 * number: 传入时间戳
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
*/
function formatTime(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}