const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const user = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
    },
    hospitalName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    initialPrimetes: {
        type: Number,
        required: true,
    },
    hospitalID: {
        type: String,
        default: "None"
    },
    password: {
        type: String,
        required: true
    }
});

user.pre("save", async function(next) {
    const salt = await bcryptjs.genSalt();
    this.password = await bcryptjs.hash(this.password, salt);
    next();
});

user.statics.login = async function(email, password) {
    const user = await this.findOne({email});
    if (user) {
        const auth = await bcryptjs.compare(password, user.password);
        // console.log(auth);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

const User = mongoose.model('User', user);

module.exports = User;