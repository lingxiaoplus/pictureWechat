// pages/index/home.js
// 引入utils包下的js文件
var Constant = require('../../utils/constant.js');
var HttpUtil = require('../../utils/HttpUtil.js');
var UIUtil = require('../../utils/UIUtil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,  //显示面板指示点
    autoplay: true,     //自动切换
    interval: 1500,    //自动切换时间间隔
    duration: 500,    //滑动动画时长
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '首页',
    })
    console.log("onload")
    var that = this
    requestData(that, mCurrentPage);
  },
  loadMore: function (event) {
    var that = this
    requestData(that, mCurrentPage + 1);
  },

  onItemClick: function (event) {
    var targetUrl = "/pages/image/image";
    if (event.currentTarget.dataset.url != null)
      targetUrl = targetUrl + "?url=" + event.currentTarget.dataset.url;
    wx.navigateTo({
      url: targetUrl
    });
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
    requestData(this, 0);
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
  onSwiperItemClick: function(e){
    console.log(e.target.dataset.index);
    wx.navigateTo({
      url: '../category/categorydetail?categoryId=' + e.target.dataset.id + '&typed=banner',
    })
  }
})


/**
 * 定义几个数组用来存取item中的数据
 */

var mBannerUrl = [];
var mBannerTitles = [];
var mCurrentPage = 0;
var mCurrentList = [];
/**
 * 请求数据
 * @param that Page的对象，用来setData更新数据
 * @param skip 请求的目标页码
 */
function requestData(that, skip) {
  HttpUtil.doGet(Constant.HOME_PAGE_URL + skip)
  .then(res=>{
    console.log("轮播图：",res.res.homepage)
    if (res.res.homepage.length >= 2) {
      bindBanner(res.res.homepage[1]);
    } else {
      console.log("homepage is empty");
    }
    
    mCurrentList = mCurrentList.concat(res.res.wallpaper);
    console.log("推荐图：", mCurrentList)
    that.setData({
      items: mCurrentList,
      loadmorehidden: false,
      imgUrls: mBannerUrl,
    });
    wx.stopPullDownRefresh();
    mCurrentPage = skip;
  }).catch(e=>{
    console.log('系统错误',e);
    UIUtil.showTextToast('系统错误');
  })
}


/**
 * 绑定轮播图数据
 */
function bindBanner(data) {
  mBannerUrl = [];
  for (var i = 0; i < data.items.length; i++){
    var url = data.items[i].value.lcover;
    var title = data.items[i].value.desc;
    var id = data.items[i].value.id;
    if(url){
      mBannerUrl.push({'url':url,'id':id,'index':i});
      mBannerTitles.push(title);
    }
  }
  
}
