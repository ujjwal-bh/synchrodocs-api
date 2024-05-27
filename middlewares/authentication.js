const CustomError = require('../errors');
const { isTokenValid } = require('../utils');
const User = require('../user/User');


const authenticateUser = async (req, res, next) => {
    const accessToken  = req.signedCookies?.accessToken;
    if(!accessToken) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid .');
    }

    try{
        const { userId} = isTokenValid(accessToken);
        // req.user = { name, userId, role };
        req.user = await User.findOne({ _id:userId });
        next();
    } catch (err) {
        console.log(err);
        throw new CustomError.UnauthenticatedError('Authentication Invalid .');
    }
}


module.exports = { authenticateUser}