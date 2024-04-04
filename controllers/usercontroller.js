const User = require('../model/user');

module.exports.signup_post = async (req, res) => {
    const {email, username, hospitalName, phone, initialPrimetes, hospitalID, password} = req.body;
    console.log(email, username, hospitalName, phone, initialPrimetes, hospitalID, password);
    await User.create({email, username, hospitalName, phone, initialPrimetes, password}).then(res => {
        return res.status(201).json({message: "User created successfully!", body: res});
    }).catch(err => {
        // console.log(err.code);
        if (err.code === 11000) {
            // console.log(err)
            return res.status(403).json({message: "User already exists!"});
        }
        // console.log(err);
        return res.status(500).json({message: "Internal server error!"});
    });
}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;
    // console.log(email, password);
    if (email === undefined || password === undefined) {
        return res.status(400).json({message: "Bad request!"});
    }                                   
    const user = User.login(email, password).then(result => {
        // console.log(result);
        return res.status(200).json({message: "User logged in successfully!", body: result});
    }).catch(err => {
        // console.log(err);
        if (err.message === 'incorrect email') {
            return res.status(400).json({message: "Incorrect email!"});
        } else if (err.message === 'incorrect password') {
            return res.status(401).json({message: "Incorrect password!"});
        }
        return res.status(500).json({message: "Internal server error!"});
    })
}