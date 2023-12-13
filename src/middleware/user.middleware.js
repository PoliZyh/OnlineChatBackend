const { 
    userFormateError,
    captchaError,
    userRegisterError,
    userNotExited,
    userInvalidPassword,
    userLoginError
} = require('../constant/error.type')

const {
    getUserInfo
} = require('../service/user.service')

const bcrypt = require('bcryptjs')

// 参数验证器
const userValidator = async (ctx, next) => {
    const { account, password } = ctx.request.body
    if (!account || !password) {
        console.error('账号或密码为空', ctx.request.body)
        ctx.app.emit('error', userFormateError, ctx) // 提交错误
        return
    }
    await next()
}

// 注册参数校验
const registerValidator = async (ctx, next) => {
    try {
        ctx.verifyParams({
            username: { type: 'string', required: true },
            password: { type: 'string', required: true },
            checkPassword: { type: 'string', required: true },
            code: { type: 'string', required: true }
        })
    } catch {
        return ctx.app.emit('error', userFormateError, ctx)
    }
    // 密码不一致
    if (ctx.request.body.password !== ctx.request.body.checkPassword) {
        return ctx.app.emit('error', userRegisterError, ctx)
    }
    // 验证码不一致
    if (ctx.session.captcha !== ctx.request.body.code) {
        return ctx.app.emit('error', captchaError, ctx)
    }
    await next()
}

// 密码加密
const cryptPassword = async (ctx, next) => {
    const { password } = ctx.request.body;
    try {
        const salt = bcrypt.genSaltSync(10);
        // hash保存的是密文
        const hash = bcrypt.hashSync(password, salt);
        ctx.request.body.password = hash;
        await next();
    } catch (error) {
        console.error(error);
        ctx.app.emit('error', userRegisterError, ctx);
        return
    }
}

// 验证登录
const verifyLogin = async (ctx, next) => {
    const { account, password } = ctx.request.body
    try {
        const res = await getUserInfo({ account })
        if (!res) {
            console.error('用户不存在', { account })
            ctx.app.emit('error', userNotExited, ctx)
            return
        }
        // 2. 比对密码是否匹配（不匹配则报错）
        if (!bcrypt.compareSync(password, res.password)) {
            console.error('密码错误')
            ctx.app.emit('error', userInvalidPassword, ctx)
            return
        }
    } catch (error) {
        console.error(error)
        ctx.app.emit('error', userLoginError, ctx)
        return
    }
    

    await next()
}


module.exports = {
    userValidator,
    registerValidator,
    cryptPassword,
    verifyLogin
}