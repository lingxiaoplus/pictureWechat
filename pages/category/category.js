// pages/category/category.js
var HttpUtil = require('../../utils/HttpUtil.js');
var UIUtil = require('../../utils/UIUtil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '分类',
    })
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
    getCategory(this)
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
    getCategory(this)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onImageClick: function (e) {
    var index = e.currentTarget.dataset.id;
    var id = this.data.categoryList[index].id;
    var title = this.data.categoryList[index].rname;
    console.log('列表详情', this.data.categoryList)
    
    wx.navigateTo({
      url: '../category/categorydetail?categoryId=' + id + '&typed=category' + '&title=' + title,
    })
  }
})

function getCategory(that){
  that.data.categoryList = [];
  HttpUtil.doGet('http://service.picasso.adesk.com/v1/wallpaper/category')
  .then(res=>{
    console.log(res.data)
    that.setData({
      categoryList: res.res.category,
    })
    wx.stopPullDownRefresh();
  }).catch(e=>{
    console.log('系统错误',e)
  });
}