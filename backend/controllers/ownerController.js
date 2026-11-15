import Owner from "../models/owner.js";

export const addowner= async (req,res,next) => {
    try{
        const {fullname,username,email,password}= req.body
        const owner= await Owner.create({
            fullname,
            username,
            email,
            password
        })
        return res.status(201).json(owner)
    } catch (error){
        next(error)
    }
}

export const updateuser= async (req,res,next) => {
    try{
    const {id}= req.params
    const {fullname,username,email}= req.body

    const owner= await Owner.findById(id)
    owner.fullname= fullname || owner.fullname
    owner.username= username || owner.username
    owner.email= email || owner.email

    await owner.save()

    return res.status(200).json(user)
    } catch (error){
        next(error)
    }
}
