const Router = require('koa-router')

const {
    findUserAndGroups
} = require('../controller/search.controller')

const {
    auth
} = require('../middleware/auth.middleware')

const {
    searchValidator
} = require('../middleware/search.middleware')


const router = new Router({
  prefix: '/search'
})


router.get('/', auth, searchValidator, findUserAndGroups)

module.exports = router