const User = require("../models/User")
const bcrypt = require('bcrypt');

// Register New User
const RegisterNewUser = async (req, res) => {
    const { name, email, number, password } = req.body;
    if (name, email, password) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hasPassword = await bcrypt.hash(password, salt)
            console.log(hasPassword)

            const userData = {
                name: name,
                email: email,
                number: number,
                password: hasPassword
            }
            let user = new User(userData);
            let result = await user.save();
            result = result.toObject();
            delete result.password;
            res.status(201).json(result);
        } catch (error) {
            res.status(401).json({ error: error });
        }
    } else {
        res.status(401).json({ message: "Field required:- name, email, number, password" });
    }
}

// LogIn User
const LogInUser = async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne({ email: req.body.email });
        const passwordIsValid = await bcrypt.compare(req.body.password, user.password);
        if (!user || !passwordIsValid) {
            return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
        } else {
            return res.status(200).json(user);
        }
    } else {
        res.status(401).json({ result: "email & password is required." });
    }
}

module.exports = {
    RegisterNewUser,
    LogInUser
}