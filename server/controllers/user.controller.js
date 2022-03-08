const User = require("../models/user.model");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


//show all
module.exports.getAll = (req, res) => {
    User.find()
        .then(allUsers => {
            res.json(allUsers)
        })
        .catch(err => res.json({ message: "Something went wrong", error: err }))
}

//register
module.exports.register = (req, res) => {
    console.log(req.body)
    User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({
                id: user._id
            }, process.env.FIRST_SECRET_KEY);

            res
                .cookie("usertoken", userToken, {
                    httpOnly: true
                })
                .json({ msg: "success!", user: user });
        })
        .catch(err => res.json(err));
}

//login
module.exports.login = async(req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user === null) {
        // email not found in users collection
        return res.sendStatus(400);
    }

    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if (!correctPassword) {
        // password wasn't a match!
        return res.sendStatus(400);
    }

    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id
    }, process.env.FIRST_SECRET_KEY);

    // note that the response object allows chained calls to cookie and json
    res
        .cookie("usertoken", userToken, {
            httpOnly: true
        })
        .json({ msg: "success!" });
}

//logout
module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

module.exports.getLoggedInUser = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
    User.findById(decodedJWT.payload._id)
        .then(user => res.json(user))
        .catch(err => res.json(err))

}



