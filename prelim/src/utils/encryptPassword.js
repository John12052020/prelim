const bcrypt = require("bcrypt");

function encryptPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, encrypted) => {
            if (err) reject(err);
            resolve(encrypted);
        });
    });
}

function comparePassword(password, encryptedPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, encryptedPassword, (err, same) => {
            if (err) reject(err);
            resolve(same);
        });
    });
}

module.exports = {
    encryptPassword,
    comparePassword,
};
