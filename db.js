const bcrypt = require('bcryptjs')

function createUser(username, password, email, profile, callback) {
    const cryptoPassword = bcrypt.hashSync(password, 10)
    global.db.collection('users').insertOne({ username, password: cryptoPassword, email, profile }, callback)
}

function resetPassword(email, callback) {
    const utils = require('./utils')
    const newPass = utils.generatePassword()
    const cryptoPassword = bcrypt.hashSync(newPass, 10)
    global.db.collection('users').updateOne({ email }, { $set: { password: cryptoPassword } }, (res, err) => {
        callback(res, err, newPass)
    })
}

function countAll(callback) {
    global.db.collection('users').countDocuments(callback)
}

const TAMANHO_PAGINA = 5
function findAllUsers(pagina, callback) {
    const totalSkip = (pagina - 1) * TAMANHO_PAGINA
    global.db.collection('users').find().skip(totalSkip).limit(TAMANHO_PAGINA).toArray(callback)
}

module.exports = { createUser, resetPassword, findAllUsers, countAll, TAMANHO_PAGINA }