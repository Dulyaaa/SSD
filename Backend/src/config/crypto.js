// crypto module
const crypto = require("crypto");
const algorithm = "aes-256-cbc";
// generate 16 bytes of random data
const initVector = crypto.randomBytes(16);
// secret key generate 32 bytes of random data
const securityKey = crypto.randomBytes(32);

const encrypt = (token) => {
    // the cipher function
    const cipher = crypto.createCipheriv(algorithm, securityKey, initVector);

    // encrypt the message
    // input encoding
    // output encoding
    let encryptedData = cipher.update(token, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    console.log("Encrypted message: " + encryptedData);
    return encryptedData;
}

const decrypt = (encryptedToken) => {
    // the decipher function
    const decipher = crypto.createDecipheriv(algorithm, securityKey, initVector);
    let decryptedData = decipher.update(encryptedToken, "hex", "utf-8");
    decryptedData += decipher.final("utf8");
    console.log("Decrypted message: " + decryptedData);
    return decryptedData;
}

module.exports = {
   encrypt,
   decrypt
};