const {
    findAllById,
    addFriendGroup
} = require('../service/friend.service')



class FriendController {

    async findAllFriendsById(ctx, next) {
        const id = ctx.request.params.id;
        const list = await findAllById(id)
        
        ctx.body = {
            code: 200,
            msg: "获取好友列表成功",
            data: list
        }
    }

    async addFriendGroup(ctx, next) {
        const id = ctx.request.params.id;
        const groupName = ctx.request.body.groupName;

        const hasAdded = await addFriendGroup(id, groupName)
        ctx.body = {
            code: 200,
            msg: hasAdded ? "添加好友分组成功" : "添加好友分组失败",
            data: hasAdded
        }

    }

}



module.exports = new FriendController()