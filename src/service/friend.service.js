const Friend = require('../model/friend.model')
const FriendGroup = require('../model/friend_group.model')
const User = require('../model/user.model')

class FriendService {

    async findAllById(id) {
        let groups = await FriendGroup.findAll({
            attributes: ['id', 'groupName'],
            where: {
                userId: id * 1
            }
        })
        if(!groups) {
            return null
        }
        // 查询对应的friends
        for(let i = 0; i < groups.length; i++) {
            const fiends = await Friend.findAll({
                attributes: ['id', 'userId'],
                where: {
                    groupId: groups[i].id
                }
            })
            groups[i].dataValues.groupList = fiends
            for(let j = 0; j < groups[i].dataValues.groupList.length; j++) {
                const user = await User.findOne({
                    attributes: ['username', 'userava'],
                    where: {
                        id: groups[i].dataValues.groupList[j].userId
                    }
                })
                const { username, userava } = user.dataValues
                groups[i].dataValues.groupList[j].dataValues.username = username
                groups[i].dataValues.groupList[j].dataValues.userava = userava
            }
        }
        return groups ? groups : null
    }

    async addFriendGroup(id, groupName) {
        const res = await FriendGroup.create({
            userId: id,
            groupName
        })
        return res.dataValues ? true : false
    }

    async deleteFriendGroup(id, groupId) {
        // 判断当前朋友分组下是否有好友
        const friends = await Friend.findAll({
            where: {
                groupId: groupId * 1
            }
        })
        if (friends.length || friends.length > 0) return null
        // 当前朋友分组下没有好友则可以正常删除
        const destroyRes = await FriendGroup.destroy({
            where: {
                id: groupId * 1,
                userId: id * 1
            }
        })
        return destroyRes > 0 ? true : false
    }

}



module.exports = new FriendService()