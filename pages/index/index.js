const AV = require('../../libs/av-weapp-min.js');
const app = getApp()
const mapHeight = app.globalData.windowHeight - 50
console.log(mapHeight)
Page({
    data: {
        mapHeight: mapHeight,
        markers: [{
            iconPath: "/assets/heads/emoji-1.png",
            id: 0,
            latitude: 30.66074,
            longitude: 104.063269,
            width: 32,
            height: 32,
            callout: { content: '待约', color: '#515151', fontSize: 12, borderRadius: 4, bgColor: '#ffe30d', padding: 4, boxShadow: '0 0 6px 0 #515151', display: 'ALWAYS' },
            // label: { color:'#ff9800', fontSize:12, content:'label', x:10, y:0 }
        }],
        controls: [{
            id: 1,
            iconPath: '/assets/images/location.png',
            position: {
                left: 10,
                top: mapHeight - 50,
                width: 32,
                height: 32
            },
            clickable: true
        }]
    },

    onLoad: function (options) {
        // if (app.globalData.userInfo) {
        //     this._getUserInfo()
        // } else {
        //     app.login()
        //         .then(() => {
        //             this._getUserInfo()
        //         })
        // }
    },

    onReady: function (e) {
        // 使用 wx.createMapContext 获取 map 上下文
        this.mapCtx = wx.createMapContext('map')
    },
    getCenterLocation: function () {
        this.mapCtx.getCenterLocation({
            success: function (res) {
                console.log(res.longitude)
                console.log(res.latitude)
            }
        })
    },
    _moveToLocation: function () {
        this.mapCtx.moveToLocation()
    },
    _translateMarker: function (la, lo) {
        this.mapCtx.translateMarker({
            markerId: 0,
            autoRotate: true,
            duration: 1000,
            destination: {
                latitude: la,
                longitude: lo,
            },
            animationEnd() {
                console.log('animation end')
            }
        })
    },
    includePoints: function () {
        this.mapCtx.includePoints({
            padding: [10],
            points: [{
                latitude: 23.10229,
                longitude: 113.3345211,
            }, {
                latitude: 23.00229,
                longitude: 113.3345211,
            }]
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
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
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    _locate: function () {
        wx.getLocation({
            type: 'wgs84',
            success: res => {
                var latitude = res.latitude
                var longitude = res.longitude
                this._moveToLocation()
                this._translateMarker(latitude, longitude)
            }
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    open: function () {
        wx.navigateTo({
            url: '/pages/open/open',
        })
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

    },
    regionchange(e) {
        console.log(e.type)
    },
    markertap(e) {
        console.log(e.markerId)
    },
    controltap(e) {
        if (e.controlId === 1) {
            // 定位
            this._locate()
        }
    }
})