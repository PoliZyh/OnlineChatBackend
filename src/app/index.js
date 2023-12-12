

const Koa = require('koa')
const { koaBody } = require('koa-body');
const cors = require('koa2-cors');
const router = require('../router');
const parameter = require('koa-parameter');

const errHandler = require('./errorHandler')

const app = new Koa()
app.use(cors());

app.use(koaBody({
    multipart: true,
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE']
}));

app.use(parameter(app));

app.use(router.routes()).use(router.allowedMethods());

// 统一错误处理
app.on('error', errHandler)

module.exports = app