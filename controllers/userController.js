const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { UserSchema } = require("../models/userModel.js")



const User = mongoose.model('User', UserSchema)

const Register = async (req, res) => {
    const { name, email, password} = req.body;

    try {
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {

            res.status(400).json({ message: "User Already Exists" })
        }
        if (!existingUser) {
            //hashing password
            const hashedPassword = await bcrypt.hash(password, 12)

            const user = await User.create({ name, email, password: hashedPassword })

            res.status(201).json({ success: true, user, message: "Account Successfuly Created" })
        }

    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }


}

const Login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ success: false, message: "Please provide email and password" })
    }

    try {
        const existingUser = await User.findOne({ email }).select("+password")
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "Invalid Credentials" })
        }
        //Comparing hashed password
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(404).json({ success: false, message: "Invalid Credentials" })
        }


        // jwt token

        const token = jwt.sign({ id: existingUser._id }, "RESTAPISECRETKEY")

        res.status(200).json({ result: existingUser,token,  message: "Successfully Logged in" })


    } catch (error) {

        return res.status(500).json({ message: "Login Failed" })

    }


}


module.exports = {Register, Login}