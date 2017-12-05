// pages/result/result.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        iconType: 'waiting'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            iconType: options.type
        })
    },
    goToIndex: function () {
        wx.redirectTo({
            url: '/pages/index/index',
        })
    },

    goToMine: function () {
        wx.redirectTo({
            url: '/pages/mine/mine',
        })
    }
})