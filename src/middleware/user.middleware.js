const { 
    userFormateError, 
} = require('../constant/error.type')

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



module.exports = {
    userValidator
}