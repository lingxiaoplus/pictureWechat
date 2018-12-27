// pages/index/hot.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    hidden: false,
    loading: false,
    loadmorehidden: true,
    plain: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '最新',
    })
    console.log('onLoad')
    var that = this
    requestData(that, mCurrentPage + 1);
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
    mCurrentPage = 0;
    this.data.items = [];
    requestData(this, mCurrentPage);
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
  
  }
})

/**
 * 定义几个数组用来存取item中的数据
 */
var mUrl = [];
var mDesc = [];
var mWho = [];
var mTimes = [];
var mTitles = [];

var mCurrentPage = 0;

// 引入utils包下的js文件
var Constant = require('../../utils/constant.js');

/**
 * 请求数据
 * @param that Page的对象，用来setData更新数据
 * @param targetPage 请求的目标页码
 */
function requestData(that, targetPage) {
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: Constant.GET_MEIZHI_URL + targetPage,
    header: {
      "Content-Type": "application/json"
    },
    success: function (res) {
      if (res == null ||
        res.data == null ||
        res.data.results == null ||
        res.data.results.length <= 0) {

        console.error("god bless you...");
        return;
      }

      var i = 0;
      for (; i < res.data.results.length; i++)
        bindData(res.data.results[i]);

      //将获得的各种数据写入itemList，用于setData
      var itemList = [];
      for (var i = 0; i < mUrl.length; i++)
        itemList.push({ url: mUrl[i], desc: mDesc[i], who: mWho[i], time: mTimes[i], title: mTitles[i] });
        
      that.setData({
        items: itemList,
        hidden: true,
        loadmorehidden: false,
      });

      mCurrentPage = targetPage;
    },
    complete: function(){
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }
  });
}

/**
 * 绑定接口中返回的数据
 * @param itemData Gank.io返回的content;
 */
function bindData(itemData) {

  var url = itemData.url.replace("//ww", "//ws");
  var desc = itemData.desc;
  var who = itemData.who;
  var times = itemData.publishedAt.split("T")[0];
  console.log(itemData)
  mUrl.push(url);
  mDesc.push(desc);
  mWho.push(who);
  mTimes.push(times);
  mTitles.push("publish by：" + "@" + who + " —— " + times);
}