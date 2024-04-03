const User = require('../model/user');

module.exports.signup_post = async (req, res) => {
    const {email, username, hospitalName, phone, presentPrimetes, hospitalID, password} = req.body;
    User.create({email, username, hospitalName, phone, presentPrimetes, hospitalID, password}).then(res => {
        res.status(201).json({message: "User created successfully!", body: res});
    }).catch(err => {
        // console.log(err.code);
        if (err.code === 11000) {
            // console.log(err)
            res.status(403).json({message: "User already exists!"});
        }
        res.status(500).json({message: "Internal server error!"});
    });
}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;
    // console.log(email, password);
    const user = User.login(email, password).then(result => {
        // console.log(result);
        res.status(200).json({message: "User logged in successfully!", body: result});
    }).catch(err => {
        // console.log(err);
        if (err.message === 'incorrect email') {
            res.status(400).json({message: "Incorrect email!"});
        } else if (err.message === 'incorrect password') {
            res.status(401).json({message: "Incorrect password!"});
        }
        res.status(500).json({message: "Internal server error!"});
    })
}