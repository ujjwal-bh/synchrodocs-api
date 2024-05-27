const {
    createJWT,
    isTokenValid,
    attachAccessCookieToResponse
} = require('./jwt');


const generateToken = require('./hexToken');

module.exports = {
    createJWT,
    isTokenValid,
    attachAccessCookieToResponse,
    generateToken,
}