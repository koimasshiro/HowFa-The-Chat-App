const asyncHandler = require('express-async-handler');
const User = require('../Models/userModel');
const generateToken = require('../Config/token');
const bcrypt = require('bcryptjs');


// Register new user
const registerUser = asyncHandler(async (req, res) => {

      //encrypting user password

    //make a salt from bcrypt lib with a value of 10
    const salt = await bcrypt.genSalt(10);

    //add salt to password
    const hashpass = await bcrypt.hash(req.body.password, salt)
    req.body.password = hashpass;


    const { name, email, password, image } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please fill in all fields');

    }

    //check if user exists in database
    const isOldUser = await User.findOne({ email });

    if (isOldUser) {
        res.status(409);
        throw new Error('A user with the given credentials already exists.');
    }

    //create new user if user doesn't exists in database
    const newUser = await User.create({
        name,
        email,
        password,
        image,
    });

    if (newUser) {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            image: newUser.image,
            token: generateToken(newUser._id)
        });
    }
    else {
        res.status(500);
        throw new Error('Failed to create the user. Please try again later.');
    }
});



// Login existing user

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    

    //find user in database
    try {
        const user = await User.findOne({ email });

        if (user) {
            const validity = await bcrypt.compare(password, user.password);

            if (!validity) {
                res.status(400).json("Wrong password")
            }
            else {
                const token = jwt.sign({
                    email: user.email,
                    id: user._id
                }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({ user, token });
            }
        }
        else {
            res.status(404).json('User does not exist')
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = { registerUser, loginUser }