//app.js
App({
  onLaunch: function (options) {
    // console.log("[onLaunch] 场景值:", options.scene)
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // console.log(res)
        wx.openCard({
          cardList: [
            {
              cardId: '',
              code: ''
            }, {
              cardId: '',
              code: ''
            }
          ],
          success: function (res) {
            // console.log(res)
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  
    // wx.openSetting({
    //   success: (res) => {
    //     wx.getUserInfo({
    //       success: function (resuser) {
    //         console.log(success)
    //       },
    //       fail: function () {
    //         // 调用微信弹窗接口
    //         wx.showModal({
    //           title: '警告',
    //           content: '您点击了拒绝授权，将无法正常使用******的功能体验。请10分钟后再次点击授权，或者删除小程序重新进入。',
    //           success: function (res) {
    //             if (res.confirm) {
    //               console.log('用户点击确定')
    //             }
    //           }
    //         })
    //       }
    //     })
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})