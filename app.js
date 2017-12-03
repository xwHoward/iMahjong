const AV = require('libs/av-weapp-min.js');
AV.init({
    appId: '3dR2Vsi36Ru3Dq7z7DmbUTN5-gzGzoHsz',
    appKey: '0vvS7YjyKuQVFVtn2PAGT6I5',
});
App({
    onLaunch: function () {
        wx.getSystemInfo({
            success: res => {
                this.globalData.windowHeight = res.windowHeight
            },
        })
    },
    login() {
        const app = this
        return new Promise(function (resolve, reject) {
            AV.User.loginWithWeapp()
                .then(user => {
                    app.globalData.userInfo = user.toJSON();
                    resolve()
                })
                .catch(err => {
                    console.error(err)
                    wx.showModal({
                        title: '提示',
                        content: '需要授权登录才能继续使用，是否重新登录？',
                        success: res => {
                            if (res.confirm) {
                                if (wx.openSetting) { //当前微信的版本 ，是否支持openSetting
                                    wx.openSetting({
                                        success: (res) => {
                                            if (res.authSetting["scope.userInfo"]) { //如果用户重新同意了授权登录
                                                AV.User.loginWithWeapp()
                                                    .then(user => {
                                                        app.globalData.userInfo = user.toJSON();
                                                        resolve();
                                                    }).catch(err => {
                                                        reject()
                                                    });
                                            } else { //用户还是拒绝
                                                app.fail()
                                                reject()
                                            }
                                        },
                                        fail: function () { //调用失败，授权登录不成功
                                            app.fail()
                                            reject()
                                        }
                                    })
                                } else {
                                    app.fail()
                                    reject()
                                }
                            } else {
                                app.fail()
                                reject()
                            }
                        }
                    })
                });
        })
    },
    fail() {
        wx.showModal({
            title: '授权失败',
            content: '很遗憾，i约麻 不能为你提供完整服务了',
            showCancel: false
        })
    },
    globalData: {
        userInfo: null,
        windowHeight: 500
    }
})