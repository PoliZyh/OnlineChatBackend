const Router = require('koa-router')

const {
    login,
    getUserInfo
} = require('../controller/user.controller')

const {
    userValidator
} = require('../middleware/user.middleware')
const { auth } = require('../middleware/auth.middleware')

const router = Router({
    prefix: '/users'
})


// 登录接口
router.post('/login', userValidator, login)
// 获取用户信息接口
router.get('/info', auth, getUserInfo)

module.exports = router