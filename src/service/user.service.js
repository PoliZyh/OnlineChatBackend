const User = require('../model/user.model.js')


class UserService {
    async getUserInfo({ id, account, password }) {
        const whereOpt = {}

        id && Object.assign(whereOpt, { id })
        account && Object.assign(whereOpt, { account })
        password && Object.assign(whereOpt, { password })


        const res = await User.findOne({
            where: whereOpt
        })

        return res ? res.dataValues : null
    }   
}

module.exports = new UserService()