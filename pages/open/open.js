const AV = require('../../libs/av-weapp-min.js');
import { timeFormatter } from '../../utils/util.js'
const app = getApp()
const groups = [{
    gid: 0,
    gdesc: '小鲜肉',
    vol: '18~25岁'
}, {
    gid: 1,
    gdesc: '老腊肉',
    vol: '26~30岁'
}, {
    gid: 2,
    gdesc: '老油条',
    vol: '30~45岁'
}, {
    gid: 3,
    gdesc: '老麻手',
    vol: '45岁+'
}, {
    gid: 4,
    gdesc: '不限',
    vol: ''
}]
const seats = [{
    sid: 0,
    sdesc: '三缺一',
    vol: '1人'
}, {
    sid: 1,
    sdesc: '差两位',
    vol: '2人'
}, {
    sid: 2,
    sdesc: '一缺三',
    vol: '3人'
}, {
    sid: 3,
    sdesc: '其他',
    vol: 'more'
}]
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
        selectedSeatIndex: 4,
        isSeatsCollapse: true,
        selectedAddress: '',
        now: timeFormatter(new Date()),
        time: '全天'
    },
    _matchObject: {
        time: {
            desc: '全天',
            timeType: 'all'
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (app.globalData.userInfo) {
            this.getUserInfo()
        } else {
            app.login()
                .then(() => {
                    this._getUserInfo()
                })
        }
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
                        this.setData({
                            avatarUrl: app.globalData.user.avatarUrl,
                            nickName: app.globalData.user.nickName
                        })
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

    setGroup: function (e) {
        const index = e.target.dataset.index || e.currentTarget.dataset.index
        this.setData({
            selectedGroup: groups[index].gdesc,
            selectedGroupIndex: index
        })
    },

    setSeat: function (e) {
        const index = e.target.dataset.index || e.currentTarget.dataset.index
        this.setData({
            selectedSeat: seats[index].sdesc,
            selectedSeatIndex: index
        })
    },

    bindTimeChange: function (e) {
        this.setData({
            time: e.detail.value
        })
        this._matchObject.time = {
            desc: e.detail.value,
            timeType: 'time'
        }
    },

    formSubmit: function (e) {
        const params = e.detail.value
        if (this._formCheck(params)) {
            console.log(params)
            this._createMatch()
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
                    address: address,
                    name: name
                }
            },
        })
    },
    _createMatch() {
        console.log(this._matchObject)
    }
})