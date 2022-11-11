const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const credentials = require('../credentials.json');
const fs = require('fs');
const formidable = require('formidable');
require('dotenv').config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uris = credentials.web.redirect_uris;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
const SCOPE = process.env.SCOPE;

router.get('/getAuthURL', (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPE,
    });
    return res.send(authUrl);
});

//get Access Token
router.post('/getToken', (req, res) => {
    //check authorization code is empty
    if (req.body.code == null) return res.status(400).send('Invalid Request');
    const code = req.body.code;
    oAuth2Client.getToken(code, (err, token) => {
        if (err) {
            // console.log('Error while trying to retrieve access token', err);
            return res.status(400).send('Error retrieving access token');
        }
        res.send(token);
    });
});

//get user information
router.post('/getUserInfo', (req, res) => {
    //get access token from header
    let token = JSON.parse(req.headers['authorization'])
    oAuth2Client.setCredentials(token);
    const oauth2 = google.oauth2({ version: 'v2', auth: oAuth2Client });
    oauth2.userinfo.get((err, response) => {
        if (err) res.status(400).send(err);
        res.send(response.data);
    })
});

// get file details
router.get('/readDrive', (req, res) => {
    let token = req.headers['authorization'];
    console.log("dhfh", token);
    oAuth2Client.setCredentials(req.headers.authorization);
    const drive = google.drive({ version: 'v3', auth: oAuth2Client });
    drive.files.list({
        pageSize: 10
    }, (err, response) => {
        if (err) {
            console.log('Error while trying to retrieve access token', err);
            return res.status(400).send("You didnt give permission for this app to view files.");
        }
        const files = response.data.files;
        res.send(files);
    });
});

//get thumbnail details
router.get('/thumbnail/:id', (req, res) => {
    let token = JSON.parse(req.headers['authorization'])
    oAuth2Client.setCredentials(token);
    const drive = google.drive({ version: 'v3', auth: oAuth2Client });
    let fileId = req.params.id;
    drive.files.get({
        fileId: fileId,
        fields: "thumbnailLink"
    }).then((response) => {
        console.log(response.data)
        res.send(response.data)
    })
});

//upload file method
router.post('/fileUpload', (req, res) => {
    //get form data
    let form = new formidable.IncomingForm();
    //get access token from the header
    let token = JSON.parse(req.headers['authorization'])
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(400).send(err);
        //return an error if the token is null
        if (token == null) return res.status(400).send('Token not found');
        //set OAuth client
        oAuth2Client.setCredentials(token);
        //set drive object
        const drive = google.drive({ version: "v3", auth: oAuth2Client });
        //set file meta data
        const fileMetadata = {
            name: files.file.name,
        };
        //set file media
        const media = {
            mimeType: files.file.type,
            body: fs.createReadStream(files.file.path),
        };
        //upload file
        drive.files.create(
            {
                resource: fileMetadata,
                media: media,
                fields: "id",
            },
            (err, file) => {
                oAuth2Client.setCredentials(null);
                if (err) {
                    res.status(400).send("You have not provided permission to upload files.")
                } else {
                    res.send('Successful')
                }
            }
        );
    });
});

module.exports = router;