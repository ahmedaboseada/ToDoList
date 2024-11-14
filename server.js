const app = require('./app')
const http = require('http')
const server = http.createServer(app)
server.listen(80, () => {
    console.log(`Server started on port ${server.address().port}!`)
})