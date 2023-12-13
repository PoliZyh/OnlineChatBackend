const jwt = require('jsonwebtoken')
const svgCaptcha = require('svg-captcha');
const {
    getUserInfo
} = require('../service/user.service')
const {
    userLoginError
} = require('../constant/error.type')
const { JWT_SECRET } = require('../config/config.default')

class UserController {
    // 登录
    async login(ctx, next) {
        try {
            const { password, ...res } = await getUserInfo(ctx.request.body)
            if (res) {
                ctx.body = {
                    code: 200,
                    msg: "登录成功",
                    data: {
                        token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' })
                    }
                }
            } else {
                return ctx.app.emit('error', userLoginError, ctx)
            }
            
        } catch (err) {
            return ctx.app.emit('error', userLoginError, ctx)
        }
    }
    // 获取用户信息
    async getUserInfo(ctx, next) {
        const { iat, exp, updatedAt, createdAt, ...info } = ctx.state.user
        ctx.body = {
            code: 200,
            msg: "获取用户信息成功",
            data: info
        }
    }
    // 验证码
    async loadCaptcha(ctx, next) {
        const captcha = svgCaptcha.create();
	    ctx.captcha = captcha.text;
        ctx.type = 'svg'
        ctx.body = captcha.data;
    }
}


module.exports = new UserController();