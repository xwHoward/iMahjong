Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentFilterName: '离我最近',
        currentFilterType: 'seat',
        matches: [{ "contact": "1111", "head": "/assets/heads/emoji-20.png", "group": "老腊肉", "seat": "一缺三", "time": "全天", "address": "四川省成都市武侯区交子大道88号", "remark": "", "creatorInfo": { "latitude": 30.572269, "longitude": 104.066541, "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoSVjCASmicEkCCja8xYXztRVfb95c6w15LbAWjjcOTfWsC6gc7ENWxU6DfkHaANqRaeeY1ic7OVpCw/0", "nickName": "大lsjgsdlhsg豪爷", "gender": 1 }, "id": "5a26ada58d6d81006198169e", "_seat": 1 }, { "contact": "2321321", "group": "不限", "seat": "缺很多", "time": "全天", "address": "四川省成都市武侯区天府大道北段1656号", "remark": "啊啊啊", "creatorInfo": { "latitude": 30.572269, "longitude": 104.066541, "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoSVjCASmicEkCCja8xYXztRVfb95c6w15LbAWjjcOTfWsC6gc7ENWxU6DfkHaANqRaeeY1ic7OVpCw/0", "nickName": "大豪爷", "gender": 0 }, "id": "5a26af7c570c3500671f43ee", "_seat": 2 }, { "contact": "1111", "head": "/assets/heads/emoji-20.png", "group": "老腊肉", "seat": "一缺三", "time": "全天", "address": "四川省成都市武侯区交子大道88号", "remark": "", "creatorInfo": { "latitude": 30.573339, "longitude": 104.786541, "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoSVjCASmicEkCCja8xYXztRVfb95c6w15LbAWjjcOTfWsC6gc7ENWxU6DfkHaANqRaeeY1ic7OVpCw/0", "nickName": "大豪爷大豪爷大豪爷sfh", "gender": 1 }, "id": "5a26b0598d6d8100619825fd", "_seat": 3 }, { "contact": "", "head": "/assets/heads/emoji-16.png", "group": "小鲜肉", "seat": "三缺一", "time": "全天", "address": "四川省成都市武侯区中国华商金融中心(金融城地铁站西)", "remark": "", "creatorInfo": { "latitude": 30.58599853515625, "longitude": 104.05902862548828, "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoSVjCASmicEkCCja8xYXztRVfb95c6w15LbAWjjcOTfWsC6gc7ENWxU6DfkHaANqRaeeY1ic7OVpCw/0", "nickName": "大豪爷skjghfsk", "gender": 0 }, "id": "5a2a52250b61605fd58506f5", "_seat": -1 }, { "contact": "", "head": "/assets/heads/emoji-11.png", "group": "小鲜肉", "seat": "三缺一", "time": "全天", "address": "成都市双流区中和黄金时代(吉龙二街北)", "remark": "", "creatorInfo": { "latitude": 30.53999137878418, "longitude": 104.0893783569336, "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoSVjCASmicEkCCja8xYXztRVfb95c6w15LbAWjjcOTfWsC6gc7ENWxU6DfkHaANqRaeeY1ic7OVpCw/0", "nickName": "大豪爷", "gender": 1 }, "id": "5a296b48ee920a00447dd4c8", "_seat": 1 }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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

    filterResults: function (type, name) {
        this.setData({
            currentFilterName: name,
            currentFilterType: type
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    setFilter: function () {
        wx.showActionSheet({
            itemList: ['离我最近', '剩余坐席', '按时间排', '按年龄段'],
            success: res => {
                switch (res.tapIndex) {
                    case 0:
                        this.filterResults('address', '离我最近')
                        break
                    case 1:
                        this.filterResults('seat', '剩余坐席')
                        break
                    case 2:
                        this.filterResults('time', '按时间排')
                        break
                    case 3:
                        this.filterResults('group', '按年龄段')
                        break
                    default:
                        this.filterResults('address', '离我最近')
                }
            }
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})