const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')
const {
    tokenExpiredError,
    jsonWebTokenError,
} = require('../constant/error.type')


// 鉴权是否登录
const auth = async (ctx, next) => {
    const { authorization = '' } = ctx.request.header
    const token = authorization.replace('Bearer ', '')

    try {
        // user即为payload信息（id、user_name、is_admin）
        const user = jwt.verify(token, JWT_SECRET)
        ctx.state.user = user
    } catch (error) {
        switch (error.name) {
            case 'TokenExpiredError':
                console.error('token已过期', error)
                return ctx.app.emit('error', tokenExpiredError, ctx)
            case 'JsonWebTokenError':
                console.error('token无效', error)
                return ctx.app.emit('error', jsonWebTokenError, ctx)
        }
    }
    await next()
}


module.exports = {
    auth
}