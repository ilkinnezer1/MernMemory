import "dotenv"
import jwt from "jsonwebtoken"


const auth  = async ( req, res, next) => {
  
    try{
       const token = req.headers.authorization
       const authToken = token && token.split(" ")[1]
        // const isCustom = token.length < 500;
        let decodedData;

        if(token){
            decodedData = jwt.verify(authToken, process.env.ACCESS_TOKEN)
            console.log(decodedData)
            req.userId = decodedData?.id;
             
        }else{
            decodedData =jwt.decode(token)
            req.userId = decodedData?.sub  
        }
        next()

    }catch(error){
        console.log(error)
    }
}

export default auth