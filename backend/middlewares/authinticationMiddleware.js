import Owner from "../models/owner.js";
import jwt from "jsonwebtoken";

export default async (req,res,next) => {
    try{
        const authHeader= req.headers.authorization
        console.log(authHeader)
        if (!authHeader) {
            return next(new Error("Unauthorized user"))
        }

        const accessToken= authHeader.split(' ')[1]
        if (!accessToken) {
            return next(new Error("Unauthorized user"))
        }

        let payload
        try{
            payload= jwt.verify(accessToken, process.env.JWT_SECRET_KEY)
        } catch(error) {
            return next(new Error("Invalid access token"))
        }

        const owner= await Owner.findById(payload.id)
        if (!owner) {
            return next(new Error("user not found"))
        }
        req.owner= owner
        next()
    } catch(error) {
        next(error)
    }
}