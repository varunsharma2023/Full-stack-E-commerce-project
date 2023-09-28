const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require('../config');

const mongoose = require('mongoose');
const UserModel = mongoose.model("UserModel");

module.exports = ( req , res , next)=>{

    const {authorization} = req.headers;//This extracts the authorization header from the incoming request, which is expected to contain the JWT token

     if(!authorization){
        return res.status(401).json({error: "user not logged in"});//This block checks if the authorization header is present or not
     }

     const token = authorization.replace("Bearer ", "");// In JWT-based authentication, the token is often passed with a "Bearer" prefix.
     jwt.verify(token, JWT_SECRET, (error,payload)=>{// If the token is valid, it passes the payload (the decoded token data) to the
        if(error){
            return res.status(401).json({error: "user not logged in"});
        }
        const {_id} = payload;//This extracts the user's _id (presumably the user's unique identifier) from the payload.
        UserModel.findById(_id)
        .then((dbUser)=>{
            req.user = dbUser;
            next();//next() function is called to pass control to the next middleware in the chain.
        })
     })

}