const app = getApp()
let publicWay= {
  // 用户微信授权信息开始
  getUserInfo:function () {
    wx.getUserInfo({
      success: function (res) {
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  app.globalData.userInfo = res.userInfo
                  // 可以将 res 发送给后台解码出 unionId
                }
              })
            }
          }
        })
      }
    })
  }
  // 用户微信授权信息结束
}
// export default ({
//   publicWay
// })
module.exports={
  publicWay
}