import {} from "dotenv/config.js"
import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import UserInfo from "../models/userInfo.js"
import auth from "../middleware/auth.js"


const router = express.Router()

router.post("/register",auth, async (req, res) => {
    const {email, name, password, surname, confirmPassword} = req.body
     const saltRounds = 12
    try{
        if(!(email && password && name && surname && confirmPassword)){
            return res.status(400).send("All input is required");
          }
          const oldUser = await UserInfo.findOne({email})
          if (oldUser) {
               return res.status(409).send("User Already Exist. Please Login");
            }
            if(password !== confirmPassword) return res.status(400).json({message: "Password you write does not match"})
           
            const encryptedPassword = await new Promise((resolve, reject) => {
                bcrypt.hash(password.toString(), saltRounds, (err, hash) => {
                  if (err) reject(err)
                  resolve(hash)
                });
              })
            const result = await UserInfo.create({email: email, name:name, surname:surname , password: encryptedPassword})
            const token = jwt.sign({email: result.email,  id: result._id}, process.env.ACCESS_TOKEN, {expiresIn: "1h"})
            result.token = token
            res.status(201).json({result, token});
    }catch(error){
        console.log(error)
    }
})

router.post("/login", auth, async (req, res) => {
    const {email, password} = req.body
    console.log(req.body)
    try{
        if(!(email && password)){
            return res.status(400).send("All input is required");
          }
             const user = await UserInfo.findOne({email})
          if (user) {
             const token = jwt.sign({email: user.email, id: user._id }, process.env.ACCESS_TOKEN, {expiresIn: "1h"})
             user.token = token
            return res.status(200).json({result: user, token});
            }
            res.status(404).send("Invalid Credentials");
    }catch(error){
        console.log(error)
    }
})




export default router;