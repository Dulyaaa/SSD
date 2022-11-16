const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const PORT = process.env.PORT;
const https = require('https')
const path = require('path')
const fs = require('fs')
const connectDB = require('./src/config/db');

// Middleware
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));

const options = {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
}

// Establishing the database connection
connectDB();

// Default Path
app.route('/').get((req, res) => {
    res.send('SSD Secure Implementation');
});

const authAPI = require('./api/auth.api');
const userAPI = require('./src/api/user.api');
const messageAPI = require('./src/api/messageAPI');


app.use('/api/oauth', authAPI);
app.use('/message', messageAPI());
app.use('/user', userAPI());

const sslServer = https.createServer(options, app)

sslServer.listen(8080, function () {
    console.log(`SSD Authentication Server is running on PORT:  ${PORT}.`);
});
