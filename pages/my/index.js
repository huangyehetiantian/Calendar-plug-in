// pages/my/index.js
const app = getApp()
import publicWay from '../public/public.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneAnimation:"",
    showCustomFlag: false
  },
  openCustom: function () {
    let showCustomFlag = !this.data.showCustomFlag
    this.setData({
      showCustomFlag: showCustomFlag
    })
  }, 
  contactCustom: function () {},
  makePhone: function () {
    wx.makePhoneCall({
      phoneNumber: '11111111111',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  login: function () {
    let that = this
    publicWay.publicWay.getUserInfo()
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
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    this.animation = animation
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