
const {
    searchFormateError
} = require('../constant/error.type')


const searchValidator = async (ctx, next) => {


    const keyword = ctx.request.query.keyword


    if (!keyword) {
        return ctx.app.emit('error', searchFormateError, ctx)
    }

    await next()
}


module.exports = {
    searchValidator
}