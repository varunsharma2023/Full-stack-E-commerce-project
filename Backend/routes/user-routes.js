
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserModel = mongoose.model('UserModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

router.post("/signup", async (req, res) => {
    const { firstName , lastName, email, password} = req.body;

    if (!firstName || !lastName || !password || !email) {
        return res.status(400).json({ error: "one or more mandatory fields are empty" });
    }

    try {
        const userFound = await UserModel.findOne({ email: email });

        if (userFound) {
            return res.status(500).json({ error: "user with this email is already registered" });
        }

        const hashedpassword = await bcryptjs.hash(password, 16);
        const user = new UserModel({ firstName , lastName, email, password: hashedpassword, });

        const newUser = await user.save();
        res.status(201).json({ result: "user sign up successfully!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!password || !email) {
        return res.status(400).json({ error: "one or more mandatory fields are empty" });
    }

    try {
        const userFound = await UserModel.findOne({ email: email });

        if (!userFound) {
            return res.status(401).json({ error: "invalid credentials" });
        }

        const didMatch = await bcryptjs.compare(password, userFound.password);
  
        if (didMatch) {

            //id: userFound._id used to identify the user , JWT_SECRET used to authenticate
            const jwtToken = jwt.sign({ _id: userFound._id }, JWT_SECRET);
            const userInfo = { email: userFound.email, firstName: userFound.firstName };

            res.status(201).json({ result: { token: jwtToken, user: userInfo } });
        } else {
            return res.status(401).json({ error: "invalid credentials" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
});

module.exports = router;
