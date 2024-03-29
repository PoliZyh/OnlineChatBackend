

module.exports = {
    // token部分
    tokenExpiredError: {
        code: '10001',
        msg: 'token过期',
        data: ''
    },
    jsonWebTokenError: {
        code: '10002',
        msg: '无效的token',
        data: ''
    },
    // 用户模块
    userFormateError: {
        code: '10101',
        msg: '用户参数格式错误',
        data: ''
    },
    userLoginError: {
        code: '10102',
        msg: '用户登录失败',
        data: ''
    },
    userRegisterError: {
        code: '10103',
        msg: '密码与重复密码不一致',
        data: ''
    },
    captchaError: {
        code: '10104',
        msg: '验证码错误',
        data: ''
    },
    userNotExited: {
        code: '10105',
        msg: '用户不存在',
        data: ''
    },
    userInvalidPassword: {
        code: '10106',
        msg: '密码错误',
        data: ''
    },

    // 朋友模块
    friendFormateError: {
        code: '10201',
        msg: '朋友模块参数格式错误',
        data: ''
    },

    // 搜索模块
    searchFormateError: {
        code: '10301',
        msg: '搜索模块参数格式错误',
        data: ''
    }

}