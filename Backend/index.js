const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const PORT = process.env.PORT;
const https = require('https')
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose');
const messageAPI = require('./messageAPI');

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
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}, (error) => {
    if(error){
    console.log('Database error', error.message);
}
});

mongoose.connection.once('open', () => {
    console.log('Database synced');
});
// Default Path
app.route('/').get((req, res) => {
    res.send('SSD Secure Implementation');
});

const authAPI = require('./api/auth.api');

app.use('/api/oauth', authAPI);
app.use('/message', messageAPI());

const sslServer = https.createServer(options, app)

sslServer.listen(8080, function () {
    console.log(`SSD Authentication Server is running on PORT:  ${PORT}.`);
});
