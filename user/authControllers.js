const User = require('./User');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { attachAccessCookieToResponse } = require('../utils');


const login = async (req, res) => {
    const {username, password} = req.body
    if(!username || !password){
        throw new CustomError.BadRequestError('Please provide username and password .');
    }

    const user = await User.findOne({ username });
    if(!user){
        throw new CustomError.UnauthenticatedError('Invalid credentials .');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError('Invalid credentials .');
    }

    const userPayload = await user.createJWTPayload();
    attachAccessCookieToResponse({ res, user:userPayload })

    res.status(StatusCodes.OK).json();
};


const logout = async (req, res) => {
    res.cookie('accessToken', 'logout', {
        httpOnly: true,
        maxAge:0
    })
    res.status(StatusCodes.OK).json({ msg:'Logged out successfully !! '});
};


module.exports = {
    login,
    logout
}