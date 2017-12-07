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

    onLoad: function (options) {
        this._locateSelf()
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
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    _locateSelf: function () {
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
    open: function () {
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
    _getNearbyMatches: function (latitude, longitude) {
        AV.Cloud.run('getNearbyMatches', { latitude, longitude })
            .then(res => {
                if (res.isSuccess) {
                    this._nearbyMatches = res.data
                    this._renderMarkers(res.data);
                }
            }, function (err) {
                console.error(err)
            });
    },
    _renderMarkers(matches) {
        this._markers = markerMaker(matches)
        this.setData({
            markers: this._markers
        })
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
            this._locateSelf()
        }
    },
    callouttap(e) {
        wx.navigateTo({
            url: `detail/detail?mid=${this._nearbyMatches[e.markerId].id}`,
        })
    }
})