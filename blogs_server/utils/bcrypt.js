const bcrypt = require('bcryptjs')

function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

function comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    hashPassword,comparePassword
}