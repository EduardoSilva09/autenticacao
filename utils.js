function generatePassword() {
    const chars = 'abcdefghijklmnopqrstuvwyxz0123456789ABCDEFGHIJKLMNOPQRSTUVWYXZ'
    let pass = ''
    for (let i = 0; i < 10; i++) {
        pass += chars.charAt(Math.random() * 61)
    }
    return pass
}

module.exports = { generatePassword }