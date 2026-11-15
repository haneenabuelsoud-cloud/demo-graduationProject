import Owner from "./models/owner.js";
import jwt from "jsonwebtoken";

const createtoken= (id) => {
     return jwt.sign({id}, process.env.JWT_SECRET_KEY , {
        expiresIn: process.env.JWT_EXPIRE_TIME })
}

export const signup= async (req,res,next) => {
    const owner= await Owner.create({
       fullname: req.body.fullname ,
       username: req.body.username ,
       email: req.body.email ,
       password: req.body.password 
    })

    const token= createtoken(owner._id)
    res.status(201).json({data: owner , token})
}

export const login= async (req,res,next) => {
    const owner= await Owner.findOne({username: req.body.username , password: req.body.password})
    if (!owner) {
        return next("Incorrect username or password")
    }
    const token= createtoken(owner._id)
    res.status(200).json({data: owner , token})
}