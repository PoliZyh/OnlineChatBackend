const Router = require('koa-router')

const { auth } = require('../middleware/auth.middleware')
const {
    findAllFriendsById
} = require('../controller/friend.controller')



const router = new Router({
    prefix: '/friends'
})


// 获取朋友列表接口
router.get('/list/:id', auth, findAllFriendsById)

module.exports = router