const {
    findAllById,
    addFriendGroup,
    deleteFriendGroup
} = require('../service/friend.service')



class FriendController {

    // 通过Id获取好友列表
    async findAllFriendsById(ctx, next) {
        const id = ctx.request.params.id;
        const list = await findAllById(id)
        
        ctx.body = {
            code: 200,
            msg: "获取好友列表成功",
            data: list
        }
    }

    // 添加好友分组
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

    // 删除好友分组
    async delFriendGroup(ctx, next) {
        const id = ctx.request.params.id;
        const groupId = ctx.request.params.groupId;
        const delRes = await deleteFriendGroup(id, groupId)

        ctx.body = {
            code: delRes ? 200 : 204,
            msg: delRes ? '删除好友分组成功' : '好友分组不为空',
            data: delRes
        }
    }

}



module.exports = new FriendController()