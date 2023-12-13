const jwt = require('jsonwebtoken')
const svgCaptcha = require('svg-captcha');
const {
    getUserInfo, create
} = require('../service/user.service')
const {
    userLoginError
} = require('../constant/error.type')
const { JWT_SECRET } = require('../config/config.default')
const {
    BEGIN_ACCOUNT,
    END_ACCOUNT
} = require('../config/config.default')
const uniqueRandomPromise = import('unique-random');

class UserController {
    // 登录
    async login(ctx, next) {
        try {
            const { password, ...res } = await getUserInfo({ account: ctx.request.body.account })
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
            console.error(err)
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
	    ctx.session.captcha = captcha.text;
        ctx.type = 'svg'
        ctx.body = captcha.data;
    }
    // 注册
    async register(ctx, next) {

        const { default: uniqueRandom } = await uniqueRandomPromise;
        const generateRandomAccount = uniqueRandom(BEGIN_ACCOUNT, END_ACCOUNT);
        // 生成新账号
        let newAccount = generateRandomAccount()
        // 查询数据库是否存在
        while (await getUserInfo({ account: newAccount })) {
            newAccount = generateRandomAccount()
        }
        newAccount = newAccount.toString()
        // 写入数据库
        const { username, password } = ctx.request.body
        await create(username, password, newAccount)

        ctx.body = {
            code: 200,
            msg: "注册成功",
            data: {
                account: newAccount
            }
        }
    }
}


module.exports = new UserController();