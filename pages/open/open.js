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
        selectedGroup: '小鲜肉',
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
        time: null,
        heads: heads
    },
    _matchObject: {
        groupRange: [18, 25],
        seats: 1,
        startAt: new Date(),
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
        this.toggleGroup()
    },

    setSeat: function (e) {
        const index = e.target.dataset.index || e.currentTarget.dataset.index
        this.setData({
            selectedSeat: seats[index].sdesc,
            selectedSeatIndex: index
        })
        this._matchObject.seats = seats[index].seat
        this.toggleSeats()
    },
    setHead: function (e) {
        const index = e.target.dataset.index || e.currentTarget.dataset.index
        this.setData({
            selectedHead: heads[index],
            selectedHeadIndex: index
        })
        // this._matchObject.head = heads[index]
        this.toggleHead()
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
        const startAt = e.detail.value.split(':');
        this._matchObject.startAt = (new Date()).setHours(startAt[0], startAt[1])
    },

    formSubmit: function (e) {
        const params = e.detail.value
        const formId = e.detail.formId
        if (this._formCheck(params)) {
            console.log(params)
            this._createMatch(params, formId)
        }
    },
    _formCheck(formData) {
        if (formData.time === '') {
            this._showToptip('请填写组局时间')
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
    _createMatch(params, formId) {
        Object.assign(this._matchObject, params, { formId })
        console.log(this._matchObject)
        AV.Cloud.run('createMatch', this._matchObject)
            .then(res => {
                if (res.isSuccess) {
                    wx.redirectTo({
                        url: '/pages/result/result?type=success',
                    })
                } else {
                    wx.redirectTo({
                        url: '/pages/result/result?type=cancel',
                    })
                }
            }, function (err) {
                console.error(err)
            });
    }
})