//index.js
//获取应用实例
const app = getApp()
let flag = true
Page({
  data: {
    motto: 'Hello World',
    nowDate: '',
    monthDay: 1,
    isDisabled: false,
    isFirstDisabled: true,
    isLastDisabled: false,
    lastMonth: 0,
    currentIndex: 1,
    arr1: [],
    dayArr: [],
    allday: [],
    firstEmpty: [],
    userInfo: {},
    weekendArr: ['日', '一', '二', '三', '四', '五', '六'],
    videoContext: '',
    playUrl: '',
    hasUserInfo: false,
    weekday: '',
    currentIndex: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    nowMonth: 0
  },
  //事件处理函数
  bindViewTap: function () {

  },
  // 将当前日期转化成****年**月的格式
  timeChange: function (n) {
    let nowtime = new Date();
    let year = nowtime.getFullYear(0)
    let month = nowtime.getMonth() + n
    let time = year + '年' + month + '月'
    return time
  },
  // 计算每个月一共有多少天
  timeDay: function (n) {
    let nowtime = new Date();
    let year = nowtime.getFullYear(0)
    let month = nowtime.getMonth() + n
    let day = new Date(year, month, 0).getDate()
    return day
  },
  // 计算每个月第一天是周几
  timeWeekendDay: function (n) {
    let nowtime = new Date();
    let year = nowtime.getFullYear(0)
    let month = nowtime.getMonth() + n
    let weekday = new Date(Date.UTC(year, month - 1, 1)).getDay()
    return weekday
  },
  // 计算在每月第一天在当月第一周之前的空余的天数
  firstEmptyWay: function () {
    let arr = []
    for (let i = 1; i <= this.data.weekday; i++) {
      arr.push(' ')
    }
    this.setData({
      firstEmpty: arr
    })
  },
  chooseTime: function (e) {
    if (e.target.dataset.id >= this.data.monthDay){
      this.setData({
        currentIndex: JSON.stringify(e.target.dataset.id)
      })
      let day = JSON.stringify(e.target.dataset.id)
      let month = JSON.stringify(this.data.monthDay)
      wx.setStorage({
        key: "day",
        data: day
      })
      wx.setStorage({
        key: "month",
        data: month
      })
    }
  },
  // 根据年与日渲染日历列表
  initMonthDay: function (n) {
    var time = this.timeChange(n)
    let allday = this.timeDay(n)
    let weekday = this.timeWeekendDay(n)
    this.setData({
      nowDate: time,
      allday: allday,
      weekday: weekday
    })
    this.firstEmptyWay()
    let allDayArr = []
    let that = this
    for (let i = 1; i <= this.data.allday; i++) {
      let str = {}
      str.day =i;
      if (i< that.data.monthDay) {
        str.disabledFlag = true
      } else {
        str.disabledFlag = false
      }
      allDayArr.push(str)
    }
    this.setData({
      allday: allDayArr
    })
    allDayArr.unshift(this.data.firstEmpty)
  },
  // 上个月日历表渲染
  lastMonth: function () {
    let that = this
    let month = this.data.monthDay
    let nowMonth = new Date().getMonth()
    let monthDay = new Date().getDate()
    if (this.data.nowMonth - this.data.lastMonth > 0) {
      let lastMonth = this.data.nowMonth - 1
      that.setData({
        isFirstDisabled: false,
        nowMonth: nowMonth,
        currentIndex: monthDay,
        isFirstDisabled: false,
        isLastDisabled: false
      })
    } else {
      that.setData({
        isFirstDisabled: true
      })
    }
    this.initMonthDay(this.data.nowMonth)
  },
  // 下个月日历表渲染
  nextMonth: function () {
    let nextMonth = this.data.nowMonth + 1
    let lastMonth = this.data.nowMonth
    this.setData({
      currentIndex: 1,
      nowMonth: nextMonth,
      isLastDisabled: true,
      isFirstDisabled: false,
      lastMonth: lastMonth
    })
    this.initMonthDay(this.data.nowMonth)
  },
  onLoad: function () {
    let monthDay = new Date().getDate()
    let nowMonth = new Date().getMonth()
    this.setData({
      nowMonth: nowMonth,
      monthDay: monthDay,
      currentIndex: monthDay,
      lastMonth: nowMonth - 1
    })
    this.initMonthDay(nowMonth)

    if (app.globalData.userInfo) {
      wx.setNavigationBarTitle({
        title: '选择出发日期',
      })

    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
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
  launchAppError: function (e) {
    console.log(e.detail.errMsg)
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
