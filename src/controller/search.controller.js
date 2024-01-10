const {
    getUserInfo
} = require('../service/user.service.js')

const {
    USER_GROUP
} = require('../constant/global.enum.js')

class SearchController {
    async findUserAndGroups(ctx) {
        // 搜索用户和群聊
        const keyword = ctx.request.query.keyword
        const res = []
        const userRes = await getUserInfo({ account: keyword })
        // TODO 检索群聊
        userRes && res.push({
            id: userRes.id,
            account: userRes.account,
            name: userRes.username,
            ava: userRes.userava,
            type: USER_GROUP.user
        })
        ctx.body = {
            code: 200,
            msg: '检索成功',
            data: res
        }
    }
}



module.exports = new SearchController()