const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique:true,
        required: [true, 'Please provide username .'],
        minlength : [5, 'Username can\'t be less than 5 characters .'],
        maxlength : [20, 'Username can\'t be less than 5 characters .'],
    },
    password: {
        type: String,
        required: [true, 'Please provide password.'],
        minlength: [6, 'Password must be at least 6 characters .']
    },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } } );


UserSchema.pre('save', async function(){
    if(!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})


UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}


UserSchema.methods.createJWTPayload = async function(){
    return { name:this.username, userId:this._id}
}


module.exports = mongoose.model('User', UserSchema);