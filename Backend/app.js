const express = require('express')
const https = require('https')
const path = require('path')
const fs = require('fs')

const app = express()

const options = {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
}

app.use('/', (req, res, next) => {
    res.send('Hello from SSl server')
})

const sslServer = https.createServer(options, app)

sslServer.listen(3000, () => console.log('secure server'))