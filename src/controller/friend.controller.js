const {
    findAllById
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

}



module.exports = new FriendController()