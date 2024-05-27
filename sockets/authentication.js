const CustomError = require('../errors');
const { isTokenValid } = require('../utils');
const User = require('../user/User');
const cookieParser = require('cookie-parser');
const cookie = require('cookie');

const authenticateUser = async (socket, req, res, next) => {
    const parsedCookie = cookie.parse(req.headers.cookie || "");
    const signedCookies = cookieParser.signedCookies(parsedCookie, process.env.JWT_SECRET);
    const accessToken  = signedCookies?.accessToken;

    if(!accessToken) {
        next(new CustomError.UnauthenticatedError('Authentication Invalid .'));
    }

    try{
        const {userId} = isTokenValid(accessToken);
        // req.user = { name, userId, role };
        req.user = await User.findOne({ _id:userId });

        next();
    } catch (err) {
        next(new CustomError.UnauthenticatedError('Authentication Invalid .'));
    }
}


module.exports = { authenticateUser }