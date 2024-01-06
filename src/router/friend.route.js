const Router = require('koa-router')

const { auth } = require('../middleware/auth.middleware')
const {
    findAllFriendsById,
    addFriendGroup,
    delFriendGroup
} = require('../controller/friend.controller')
const {
    addFriendGroupValidator
} = require('../middleware/friend.middleware')


const router = new Router({
    prefix: '/friends'
})


// 获取朋友列表接口
router.get('/list/:id', auth, findAllFriendsById)
// 新增分组接口
router.post('/list/:id', auth, addFriendGroupValidator, addFriendGroup)
// 删除分组接口
router.delete('/list/:id/:groupId', auth, delFriendGroup)

module.exports = router