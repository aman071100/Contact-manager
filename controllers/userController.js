const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Register user
// @route GET /api/user/register
// @access public
const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const availableUser = await User.findOne({ email });

    if (availableUser) {
        res.status(400);
        throw new Error("Please use different email");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201);
        res.json({ _id: user.id, email: user.email });
        console.log(user);
    }
    else {
        res.status(400);
        throw new Error("Entered data is not valid");
    }

});

// @desc Login user
// @route GET /api/user/login
// @access public
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const user = await User.findOne({ email });

    // compare the hashed password with entered password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                _id: user.id
            }
        }, process.env.ACCESS_SECRET_TOKEN,
            { expiresIn: "15m" })

         res.status(200).json({ accessToken });
    }
    else {
        res.status(401);
        throw new Error("email or password is  not valid");
    }

});

// @desc Current data
// @route GET /api/user/current
// @access private
const currentUser = asyncHandler(async (req, res) => {

    res.status(200).json(req.user);
});


module.exports = { registerUser, loginUser, currentUser };