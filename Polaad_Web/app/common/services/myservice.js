"use strict";
var CryptoJS = require("crypto-js");
var key = CryptoJS.enc.Utf8.parse('7061737323313233');
var iv = CryptoJS.enc.Utf8.parse('7061737323313233');
exports.encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse("ganga"), key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
});
exports.decrypted = CryptoJS.AES.decrypt(exports.encrypted, key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
});
//# sourceMappingURL=myservice.js.map