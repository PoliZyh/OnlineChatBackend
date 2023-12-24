const {
    friendFormateError
} = require('../constant/error.type')


const addFriendGroupValidator = async (ctx, next) => {

    try {
        ctx.verifyParams({
            groupName: { type: 'string', required: true }
        })
    } catch (err){
        return ctx.app.emit('error', friendFormateError, ctx)
    }

    await next()
}




module.exports = {
    addFriendGroupValidator
}