const seq = require('../db/seq')
const { DataTypes } = require('sequelize')

const Friend = seq.define('friend', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    groupId: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '分组ID'
    }
})

// Friend.sync({
//     force: true
// })


module.exports = Friend