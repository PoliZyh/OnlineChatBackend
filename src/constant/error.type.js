

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
    }
}