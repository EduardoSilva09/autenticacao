const bcrypt = require('bcryptjs')

function createUser(username, password, email, callback) {
    const cryptoPassword = bcrypt.hashSync(password, 10)
    global.db.collection('users').insertOne({ username, password: cryptoPassword, email }, callback)
}

function resetPassword(email, callback) {
    const utils = require('./utils')
    const newPass = utils.generatePassword()
    const cryptoPassword = bcrypt.hashSync(newPass, 10)
    global.db.collection('users').updateOne({ email }, { $set: { password: cryptoPassword } }, (res, err) => {
        callback(res, err, newPass)
    })
}

module.exports = { createUser, resetPassword }