import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import UserInfo from "../models/userInfo.js"



export const signInProfile = async (req, res) => {
    const {email, password}  = req.body

    try{
        const existingUser  = await UserInfo.findOne({email}) // Taking data from database to match

        if(!existingUser){
          return res.status(404).json({message: "User does not exist."})
        }
        const isPasswordSame = await bcrypt.compare(password, existingUser.password)
        console.log(isPasswordSame, "hey")

        if(!isPasswordSame) {
           return res.status(404).json({message: "Password does not match"})
        }
        const token = jwt.sign({email: existingUser.email, id: existingUser._id }, "checking", {expiresIn: "1h"})
        existingUser.token = token
        res.status(200).json({result: existingUser})

    }catch(error){
        console.log(error)
    }
}



export const signUpAccount = async (req, res) => {
    const {email, name, password, surname, confirmPassword} =req.body
    console.log("from sign up", req.body)

    try{
        const user = new UserInfo(req.body).save()
        const existingUser = await UserInfo.findOne({email})
        console.log(existingUser)
        if(existingUser) return res.status(400).json({message: "User you want to create already exists"})
        
        if(password !== confirmPassword) return res.status(400).json({message: "Password you write does not match"})

        const hashedPass = await bcrypt.hash(password, 12)

        const result = await UserInfo.create({email, name:`${name}`, surname:`${surname}` , password:hashedPass})
        
        result.token = token
        res.status(200).json({result})

    }catch(error){
         console.log(error)
    }
    

}

