const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports.signIn = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(404).json({
                error: 'User not found'
            })
        }
        else {
            const hash_password = user.password;
            const right_pass = await bcrypt.compare( password, hash_password );
            if(!right_pass) {
                return res.status(404).json({
                    error: 'Password incorrect'
                })
            }    
            else {
                const token = jwt.sign(
                    { _id: user._id, role: user.role },
                    process.env.JWT_SECRET,
                    { expiresIn: "1d" }
                ); 
                res.cookie("token", token, { expiresIn: "1d" });
                const {_id, email, name, role} = user;
                return res.status( 200 ).json( {
                    code: 0,
                    data: {
                        _id, name, email, role
                    },
                    token
                })
            }
        }
    }
    catch (err) {
        return res.status(500).json({
            'error': 'server error'
        })
    }
};

module.exports.signUp = async (req, res) => {
    try {
        console.log('okokokokko')
        const {fullName, userName, email, password} = req.body;
        const user = await User.findOne({
            $or: [
                {email: email},
                {userName: userName}
            ]
        });
        if (user) return res.status(400).json({
            message: 'email or username is exists'
        })
        else {
            const hash_password = await bcrypt.hash(password, 10);
            const _user = new User({
                fullName: fullName,
                userName: userName,
                email: email,
                password: hash_password,
            });
            _user.save((err, data) => {
                if (err) {
                    return res.status(404).json({
                        error: 'bad request'
                    });
                }
                if (data) {
                    return res.status( 200 ).json( {
                        code: 0,
                        data: data,
                    });
                }
            });
        }
    }
    catch(err) {
        return res.status(500).json({
            error: 'Server error'
        })
    }
}

module.exports.replacePassword = async (req, res) => {
    try {
        const {email, password, newPassword} = req.body;
        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(404).json({
                error: 'User not found'
            })
        }
        else {
            const hash_password = user.password
            const right_pass = await bcrypt.compare(password, hash_password);
            if(!right_pass) {
                return res.status(404).json({
                    error: 'Password incorrect'
                })
            }
            else {
                const decodePass = await bcrypt.hash(newPassword, 10);
                await User.findOneAndUpdate({email: email}, {password: decodePass});
                return res.status(200).json({
                    code: 0,
                    message: 'Password changed'
                })
            }
        }
    }
    catch(err) {
        return res.status(500).json({
            'error': 'Server error'
        })
    }
}

