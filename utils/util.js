const timeFormatter = date => {
    const hour = date.getHours()
    const minute = date.getMinutes()

    return [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
};

const markerMaker = matches => {
    return matches.map((el, index) => {
        const content = `${el.time}\n${el.group}戳我！` + (el.remark ? `\n“${el.remark}”` : '')
        return {
            iconPath: el.head || "/assets/heads/emoji-1.png",
            id: index,
            latitude: el.creatorInfo.latitude,
            longitude: el.creatorInfo.longitude,
            width: 32,
            height: 32,
            callout: {
                content: content,
                color: '#515151',
                fontSize: 12,
                borderRadius: 4,
                bgColor: '#ffe30d',
                padding: 4,
                boxShadow: '0 0 6px 0 #515151',
                display: 'BYCLICK'
            },
            label: { color: '#ff9800', fontSize: 14, content: `#${el.seat}#`, x: -25, y: -50 }
        }
    })
}

module.exports = {
    timeFormatter: timeFormatter,
    markerMaker: markerMaker
}