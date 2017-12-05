const AV = require('../../libs/av-weapp-min.js');
import { timeFormatter } from '../../utils/util.js'
import { groups, seats, heads } from '../../utils/data.module'
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isToptipShow: false,
        toptipContent: '请正确填写所有字段',
        avatarUrl: '/assets/heads/emoji-1.png',
        nickName: '未登录',
        groups: groups,
        isGroupCollapse: true,
        selectedGroup: '不限',
        selectedGroupIndex: 0,
        seats: seats,
        selectedSeat: '三缺一',
        selectedSeatIndex: 0,
        isSeatsCollapse: true,
        selectedHead: '/assets/heads/emoji-1.png',
        selectedHeadIndex: 0,
        isHeadCollapse: true,
        selectedAddress: '',
        now: timeFormatter(new Date()),
        time: '全天',
        heads: heads
    },
    _matchObject: {
        groupRange: [18, 99],
        seats: 1,
        _time: {
            value: 'ALL',
            type: 'ALL'
        },
        creatorInfo: {}

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (app.globalData.userInfo) {
            this._getUserInfo()
        } else {
            app.login()
                .then(() => {
                    this._getUserInfo()
                })
        }
        this._locateSelf()
    },
    _toptipTimer: null,
    _showToptip: function (msg) {
        if (this._toptipTimer) {
            clearTimeout(this._toptipTimer)
        }
        this.setData({
            isToptipShow: true,
            toptipContent: msg
        })
        this._toptipTimer = setTimeout(() => {
            this.setData({
                isToptipShow: false
            })
        }, 2000)
    },

    _locateSelf: function () {
        wx.getLocation({
            type: 'wgs84',
            success: res => {
                var latitude = res.latitude
                var longitude = res.longitude
                this._matchObject.creatorLocation = { latitude, longitude }
                Object.assign(this._matchObject.creatorInfo, this._matchObject.creatorLocation)

            }
        })
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
                        const avatarUrl = app.globalData.user.avatarUrl
                        const nickName = app.globalData.user.nickName
                        const gender = app.globalData.user.gender
                        this.setData({ avatarUrl, nickName })
                        Object.assign(this._matchObject.creatorInfo, { avatarUrl, nickName, gender })
                    })
                    .catch(console.error);
            }
        });
    },

    toggleGroup: function (e) {
        this.setData({
            isGroupCollapse: !this.data.isGroupCollapse
        })
    },

    toggleSeats: function (e) {
        this.setData({
            isSeatsCollapse: !this.data.isSeatsCollapse
        })
    },
    toggleHead: function (e) {
        this.setData({
            isHeadCollapse: !this.data.isHeadCollapse
        })
    },

    setGroup: function (e) {
        const index = e.target.dataset.index || e.currentTarget.dataset.index
        this.setData({
            selectedGroup: groups[index].gdesc,
            selectedGroupIndex: index
        })
        this._matchObject.groupRange = groups[index].range
    },

    setSeat: function (e) {
        const index = e.target.dataset.index || e.currentTarget.dataset.index
        this.setData({
            selectedSeat: seats[index].sdesc,
            selectedSeatIndex: index
        })
        this._matchObject.seats = seats[index].seat
    },
    setHead: function (e) {
        const index = e.target.dataset.index || e.currentTarget.dataset.index
        this.setData({
            selectedHead: heads[index],
            selectedHeadIndex: index
        })
        this._matchObject.head = heads[index]
    },
    // setHead(e) {
    //     this.setData({
    //         head: `/assets/heads/emoji-${e.target.dataset.id}.png`
    //     })
    //     this.topicId = e.target.dataset.tid
    // }
    bindTimeChange: function (e) {
        this.setData({
            time: e.detail.value
        })
        this._matchObject._time = {
            value: e.detail.value,
            type: 'time'
        }
    },

    formSubmit: function (e) {
        const params = e.detail.value
        if (this._formCheck(params)) {
            console.log(params)
            this._createMatch(params)
        }
    },
    _formCheck(formData) {
        if (formData.contact === '') {
            this._showToptip('请填写勾对方式')
            return false
        }
        if (formData.address === '') {
            this._showToptip('请选择组局地点')
            return false
        }
        return true
    },
    chooseAddress() {
        wx.chooseLocation({
            success: res => {
                const latitude = res.latitude
                const longitude = res.longitude
                const address = res.address // 详细地址
                const name = res.name // 地址名
                this.setData({
                    selectedAddress: address
                })
                this._matchObject.address = {
                    latitude: latitude,
                    longitude: longitude,
                    address: address
                }
            },
        })
    },
    _createMatch(params) {
        Object.assign(this._matchObject, params)
        AV.Cloud.run('createMatch', this._matchObject)
            .then(res => {
                if (res.isSuccess) {
                    wx.redirectTo({
                        url: '/pages/result/result?type=success',
                    })
                }
            }, function (err) {
                console.error(err)
            });
    }
})