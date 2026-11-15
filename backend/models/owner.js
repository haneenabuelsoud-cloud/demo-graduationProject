import { Schema , model} from "mongoose";

const ownerSchema= new Schema({
    fullname: {
        type: String ,
        minlength: [3 , "Name must not be less than 3 characters"] ,
        maxlength: [50 , "Name must not be greatee than 50 characters"]
    } ,
    username: {
        type: String ,
        required: [true, "Username is required"]
    } ,
    email: {
        type: String ,
        unique: true ,
        match: [
        /^[a-zA-Z0-9._]*@[a-zA-Z]{3,5}.[a-zA-Z]{3}$/,'email must be like name@example.com'
     ]
    } ,
    password: {
        type: String ,
        required: [true, "Password is required"] ,
        minlength: [8 , "Password must be at least 8 characters"]
    }
})

export default model('Owner' , ownerSchema)