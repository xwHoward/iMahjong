const AV = require('../../../libs/av-weapp-min.js');
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        head: '/assets/heads/emoji-5.png'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // if (app.globalData.userInfo) {
        //     this._getUserInfo()
        // } else {
        //     app.login()
        //         .then(() => {
        //             this._getUserInfo()
        //         })
        // }
        this._initData(options.mid)
    },

    _initData: function (mid) {
        AV.Cloud.run('getMatchDetail', { matchId: mid })
            .then(res => {
                if (res.isSuccess) {
                    console.log(res.data)
                    this.setData({
                        match: res.data
                    })
                }
            }, function (err) {
                console.error(err)
            });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
    _getUserInfo: function () {
        // 获得当前登录用户
        const user = AV.User.current();
        // 调用小程序 API，得到用户信息
        wx.getUserInfo({
            success: ({ userInfo }) => {
                // 更新当前用户的信息
                user.set(userInfo)
                    .save()
                    .then(user => {
                        // 成功，此时可在控制台中看到更新后的用户信息
                        app.globalData.user = user.toJSON();
                        console.log(app.globalData.user)
                    })
                    .catch(console.error);
            }
        });
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