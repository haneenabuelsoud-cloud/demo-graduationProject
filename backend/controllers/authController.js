import Owner from "../models/owner.js";
import jwt from "jsonwebtoken";

export const ownerLogin= async (req,res,next) => {
    try{
        const {username,password}= req.body
        const owner= await Owner.findOne({username})
        if (!owner) {
            next("Wrong username or password")
        }

        const isMatched= await Owner.comparePassword(password)
        if (!isMatched) {
            next("Wrong username or password")
        }

        const accessToken= await jwt.sign(
            {ownerId: owner._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn: process.env.JWT_EXPIRE_TIME},)

        return res.status(200).json({
            message: "login successfulluy",
            accessToken, })
    } catch(error) {
        next(error)
    }
}