const User = require('./User');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

const createUser = async (req, res) => {
    const {username, password} = req.body();
    const role = 'staff';
    const isUsernameTaken = await User.findOne({ username });

    if (isUsernameTaken) {
        throw new CustomError.BadRequestError('Username already taken .');
    }
    const user = await User.create({ username, password });

    res.status(StatusCodes.CREATED).json({
        user: {
            id: user._id,
            name: user.name || "",
            username: user.username,
        }
    })
}


const updateUser = async (req, res) => {
    // const { id:userId } = req.params;

    // const {username, name, password} = req.body(); 

    

    // const updatedUser = await User.findOneAndUpdate({ _id:userId }, {}, {
    //     runValidators:true,
    //     new:true
    // });

    // if(!updatedUser) {
    //     throw new CustomError.NotFoundError(`User with id:${userId} does not exist`);
    // }

    // res.status(StatusCodes.OK).json(objectExcept(updatedUser?._doc, ['password']));
};


const resetPassword = async (req, res) => {
    // const query = objectWith(req.body, ['password']);
    // const { id:userId } = req.params;

    // const user = await User.findOne({ _id:userId });
    // if (!user) {
    //     throw new CustomError.NotFoundError(`No user found with id :${query?.id} .`);
    // }
    
    // if(req.user.id === query?.id){
    //     throw new CustomError.UnauthorizedError('Permission Denied .');
    // }
    // await checkPermission({ user:req.user, resourceUserId:user._id });
    
    // user.password = query?.password;
    // await user.save();

    // res.status(StatusCodes.OK).json({ msg: 'Password changed successfully .' });
}


const getAllUsers = async (req, res) => {
    const users = await User.find().select('-password');
    res.status(StatusCodes.OK).json({ users });
};


const getSingleUser = async (req, res) => {
    const { id: userId } = req.params;
    const user = await User.findOne({ _id: userId }).select('-password');

    if (!user) {
        throw new CustomError.NotFoundError(`No user found with id :${userId} .`);
    }

    res.status(StatusCodes.OK).json({ user })
}


const getCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({
        id:req.user._id,
        username:req.user.username,
    })
}


const deleteUser = async (req, res) => {
    const { id:userId } = req.params;

    const user = await User.findOne({ _id:userId });
    if(!user){
        throw new CustomError.NotFoundError(`No user found with id :${userId} .`);
    }
    
    if(req.user.id != userId){
        throw new CustomError.UnauthorizedError('Permission Denied .');
    }
    await user.remove();
    
    res.status(StatusCodes.OK).json({ msg: 'User deleted successfully .' });
};


module.exports = {
    createUser,
    updateUser,
    getAllUsers,
    resetPassword,
    getSingleUser,
    getCurrentUser,
    deleteUser,
}