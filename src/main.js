
const app = require('./app')

const { APP_PORT } = require('./config/config.default')

app.listen(APP_PORT, () => {
    console.log(`[Server] starting at http://localhost:${APP_PORT}`);
})
