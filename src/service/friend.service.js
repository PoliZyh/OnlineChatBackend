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

}



module.exports = new FriendService()