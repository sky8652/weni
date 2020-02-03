const Api = require('../../api/index')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    course: {

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    Api.course.getCourseInfo(options.id).then(res => {
      this.setData({
        course: res.course,
        chapters: res.chapters,
        videos: res.videos,
      });
    })
  },

  createOrder() {
    let token = wx.getStorageSync('access_token');
    if (!token) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
      return;
    }
    Api.order.createCourseOrder(this.data.course.id, 0).then(res => {
      // 请求支付订单
      Api.order.payment(res.order_id).then(res => {
        // 发起支付
        console.log(res);
      }).catch(e => {
        wx.showToast({
          icon: 'none',
          title: e || '系统错误'
        });
      });
    }).catch(e => {
      wx.showToast({
        icon: 'none',
        title: e || '系统错误'
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})