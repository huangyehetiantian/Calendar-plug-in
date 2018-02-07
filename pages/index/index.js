//index.js
//获取应用实例
const app = getApp()
let flag = true
Page({
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    monthValue:"",
    dayValue:"",
    fromCity:"北京",
    toCity:"上海",
    weekday:""
  },
  //事件处理函数
  bindViewTap: function() {
  
  },
  goArea: function () {
    wx.navigateTo({
      url: '../template/areaChose/index?param='+1,
    })
  },
  backArea:function () {
    wx.navigateTo({
      url: '../template/areaChose/index?param=' + 2,
    })
  },
  timeChoose:function () {
    wx.navigateTo({
      url: '../template/calendar-plugin-in/index',
    })
  },
  serchInfo: function () {
    wx.navigateTo({
      url: '../serchList/index?from='+this.data.fromCity+"&to"+this.data.toCity,
    })
  },
  changeDestination: function () {
   this.setData({
     fromCity: this.data.toCity,
     toCity: this.data.fromCity
   })
  },
  changeChinese: function (i) {
    
  },
  firstDate: function () {
    let time = new Date();
    let year = time.getFullYear(0);
    let month = time.getMonth()+1;
    let day = time.getDate()
    let weekday = new Date(Date.UTC(year, month - 1, day)).getDay()
    this.setData({
      monthValue: month,
      dayValue: day,
      weekday: weekday
    })
  },
  onLoad: function () {
    this.firstDate()
    if (app.globalData.userInfo) {
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
      
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

  },
  onShow: function () {
    let that = this;
    wx.getStorage({
      key: 'day',
      success: function (res) {
        that.setData({
          dayValue:res.data
        })
      },
    })
    wx.getStorage({
      key: 'month',
      success: function (res) {
        that.setData({
          monthValue: res.data
        })
      },
    })
  },
  launchAppError: function (e) {
    console.log(e.detail.errMsg)
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
