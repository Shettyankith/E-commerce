const User = require("../../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function signup(req, res) {
    try {
        const { name, email, password } = req.body;

        // Check whether the user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "User with this email ID already exists! Try signing up with a different email ID."
            });
        }

        // Check for empty values
        if (!name) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "Please provide name."
            });
        }
        if (!email) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "Please provide email."
            });
        }
        if (!password) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "Please provide password."
            });
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = await bcrypt.hashSync(password, salt);
        
        if (!hashedPassword) {
            return res.status(500).json({
                error: true,
                success: false,
                message: "Sorry, something went wrong on the server."
            });
        }

        // Modify the req.body
        const payload = {
            ...req.body,
            role : "GENERAL",
            password: hashedPassword,
        };

        // Create new user
        const newUser = new User(payload);
        await newUser.save();
        

        res.status(201).json({
            data: newUser,
            success: true,
            error: false,
            message: "User created successfully"
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: true,
            success: false,
            message: e.message || "Internal Server Error",
        });
    }
}

module.exports = signup;
