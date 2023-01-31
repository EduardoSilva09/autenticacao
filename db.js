const bcrypt = require('bcryptjs')

function createUser(username, password, email, callback) {
    const cryptoPassword = bcrypt.hashSync(password, 10)
    global.db.collection('users').insertOne({ username, password: cryptoPassword, email }, callback)
}

module.exports = { createUser }