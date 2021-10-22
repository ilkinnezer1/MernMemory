import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import UserInfo from "../models/userInfo.js"


const router = express.Router()

router.post("/register", async (req, res) => {
    const {email, name, password, surname, confirmPassword} = req.body
    try{
        if(!(email && password && name && surname && confirmPassword)){
            return res.status(400).send("All input is required");
          }
          const oldUser = await UserInfo.findOne({email})
          if (oldUser) {
               return res.status(409).send("User Already Exist. Please Login");
            }
            if(password !== confirmPassword) return res.status(400).json({message: "Password you write does not match"})
      
            const encryptedPassword = await bcrypt.hash(password, 10);
      
            const result = await UserInfo.create({email: email.toLowerCase, name, surname , password: encryptedPassword})
            const token = jwt.sign({email: result.email,  id: result._id}, "test", {expiresIn: "1h"})
            result.token = token
            res.status(201).json({result, token});
    }catch(error){
        console.log(error)
    }

    
})

router.post("/login", async (req, res) => {
    const {email, password} = req.body
    console.log(req.body)
    try{
        if(!(email && password)){
            return res.status(400).send("All input is required");
          }
             const user = await UserInfo.findOne({email})
          if (user) {
             const token = jwt.sign({email: user.email, id: user._id }, "test", {expiresIn: "1h"})
             user.token = token
            return res.status(200).json({result: user, token});
            }
            res.status(404).send("Invalid Credentials");
    }catch(error){
        console.log(error)
    }
})




export default router;