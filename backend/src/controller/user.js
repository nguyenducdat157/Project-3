const User = require("../models/user.js");

module.exports.follow = (req, res) => {
    try {
        const idFriend = req.params.id;
    }
    catch ( err ) {
        return res.status(500).json({error: 'Server error'})
    }
}