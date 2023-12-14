const seq = require('../db/seq')
const { DataTypes } = require('sequelize')

const FriendGroup = seq.define('friend_group', {
    groupName: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '朋友分组名字'
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '分组所属人的id'
    }
})


// FriendGroup.sync({
//     force: true
// })

module.exports = FriendGroup