// pages/closer/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maskHidden:false,
    imagePath: ''
  },
  chooseBg: function () {

  },
  previewImg: function () {
    var img = this.data.imagePath
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },
   /**
   * 将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
   */
  createNewImg:function () {
    var that = this;
    var ctx = wx.createCanvasContext('myCanvas');
    wx.chooseImage({
      success: function(res){
        ctx.drawImage(res.tempFilePaths[0], 0, 0,500,100)
        ctx.draw()
      }
    })
    wx.showToast({
      title: '图片生成中...',
      icon: 'loading',
      duration: 4000
    })
    setTimeout(function () {
      wx.hideToast()
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          console.log(tempFilePath)
          that.setData({
            imagePath: tempFilePath,
          });
          console.log(that.data.imagePath)
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }, 4000);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.createNewImg()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.createNewImg()
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