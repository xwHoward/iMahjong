const AV = require('../../libs/av-weapp-min.js');
import { markerMaker } from '../../utils/util.js'
const app = getApp()
const mapHeight = app.globalData.windowHeight - 60

Page({
    data: {
        mapHeight: mapHeight,
        markers: [],
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

    onLoad: function(options) {
        // if (app.globalData.userInfo) {
        //     this._getUserInfo()
        // } else {
        //     app.login()
        //         .then(() => {
        //             this._getUserInfo()
        //         })
        // }
        this._locateSelf()
    },

    onReady: function(e) {
        // 使用 wx.createMapContext 获取 map 上下文
        this.mapCtx = wx.createMapContext('map')
    },
    getCenterLocation: function() {
        this.mapCtx.getCenterLocation({
            success: function(res) {
                console.log(res.longitude)
                console.log(res.latitude)
            }
        })
    },
    _moveToLocation: function() {
        this.mapCtx.moveToLocation()
    },
    _translateMarker: function(la, lo) {
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
    includePoints: function() {
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
    _getUserInfo: function() {
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
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    _locateSelf: function() {
        wx.getLocation({
            type: 'wgs84',
            success: res => {
                var latitude = res.latitude
                var longitude = res.longitude
                this._moveToLocation()
                    // this._translateMarker(latitude, longitude)
                this._getNearbyMatches(latitude, longitude)
            }
        })
    },
    /**
     * 组局
     * 
     */
    open: function() {
        wx.navigateTo({
            url: '/pages/open/open',
        })
    },
    /**
     * 获取附近的局
     * 
     * @param {any} latitude 
     * @param {any} longitude 
     */
    _getNearbyMatches: function(latitude, longitude) {
        AV.Cloud.run('getNearbyMatches', { latitude, longitude })
            .then(res => {
                if (res.isSuccess) {
                    console.log(res.data)
                    this._renderMarkers(res.data);
                }
            }, function(err) {
                console.error(err)
            });
    },
    _renderMarkers(matches) {
        this.setData({
            markers: markerMaker(matches)
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

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
            this._locateSelf()
        }
    }
})