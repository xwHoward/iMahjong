const groups = [{
    gid: 0,
    gdesc: '小鲜肉',
    vol: '18~25岁',
    range: [18, 25]
}, {
    gid: 1,
    gdesc: '老腊肉',
    vol: '26~30岁',
    range: [26, 30]
}, {
    gid: 2,
    gdesc: '老油条',
    vol: '31~45岁',
    range: [31, 45]
}, {
    gid: 3,
    gdesc: '老麻手',
    vol: '46岁+',
    range: [46, 99]
}, {
    gid: 4,
    gdesc: '不限',
    vol: '',
    range: [18, 99]
}];
const seats = [{
    sid: 0,
    sdesc: '三缺一',
    vol: '1人',
    seat: 1
}, {
    sid: 1,
    sdesc: '差两位',
    vol: '2人',
    seat: 2
}, {
    sid: 2,
    sdesc: '一缺三',
    vol: '3人',
    seat: 3
}, {
    sid: 3,
    sdesc: '缺很多',
    vol: 'more',
    seat: -1
}];
const heads = [
    '/assets/heads/emoji-1.png', '/assets/heads/emoji-2.png', '/assets/heads/emoji-3.png', '/assets/heads/emoji-4.png', '/assets/heads/emoji-5.png', '/assets/heads/emoji-6.png', '/assets/heads/emoji-7.png', '/assets/heads/emoji-8.png', '/assets/heads/emoji-9.png', '/assets/heads/emoji-10.png', '/assets/heads/emoji-11.png', '/assets/heads/emoji-12.png', '/assets/heads/emoji-13.png', '/assets/heads/emoji-14.png', '/assets/heads/emoji-15.png', '/assets/heads/emoji-16.png', '/assets/heads/emoji-17.png', '/assets/heads/emoji-18.png', '/assets/heads/emoji-19.png', '/assets/heads/emoji-20.png', '/assets/heads/emoji-21.png', '/assets/heads/emoji-22.png', '/assets/heads/emoji-23.png', '/assets/heads/emoji-24.png', '/assets/heads/emoji-25.png', '/assets/heads/emoji-26.png', '/assets/heads/emoji-27.png', '/assets/heads/emoji-28.png', '/assets/heads/emoji-29.png', '/assets/heads/emoji-30.png'
];
module.exports = {
    groups: groups,
    seats: seats,
    heads: heads
}