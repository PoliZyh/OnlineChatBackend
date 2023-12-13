const Router = require('koa-router')

const {
    login,
    getUserInfo,
    loadCaptcha,
    register
} = require('../controller/user.controller')

const {
    userValidator,
    registerValidator,
    cryptPassword,
    verifyLogin
} = require('../middleware/user.middleware')
const { auth } = require('../middleware/auth.middleware')

const router = Router({
    prefix: '/users'
})


// 登录接口
router.post('/login', userValidator, verifyLogin, login)
// 获取用户信息接口
router.get('/info', auth, getUserInfo)
// 验证码
router.get('/captcha', loadCaptcha)
// 注册
router.post('/register', registerValidator, cryptPassword, register)



module.exports = router