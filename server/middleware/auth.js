import jwt from "jsonwebtoken"


const auth  = async ( req, res) => {
  
    try{
       const token = req.headers.authorization.split(' ')[1]
        const isCustom = token.length < 500;
        let decodedData;

        if(token && isCustom){
            decodedData = jwt.verify(token, "test")
            req.userId = decodedData?.id;   
        }else{
            decodedData =jwt.decode(token)
            req.userId = decodedData?.sub  
        }
        res.end()

    }catch(error){
        console.log(error)
    }
}

export default auth