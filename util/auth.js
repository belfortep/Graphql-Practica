const jwt = require('jsonwebtoken');

const createJWTToken = (user) => {

    return jwt.sign({ user }, 'SECRET_KEY', {
        expiresIn: '1d'
    })

}

module.exports = {
    createJWTToken
}

