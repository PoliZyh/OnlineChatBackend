const seq = require('../db/seq')
const {
    DataTypes,
} = require('sequelize')

const User = seq.define('user', {
    account: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '账号'
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: '密码'
    },
    userava: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '用户头像',
        defaultValue: 'https://i.postimg.cc/k4731mgs/default.jpg'
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '用户名'
    }
})

// User.sync({
//     force: true, // 若有表，先删除再创建
// })

module.exports = User