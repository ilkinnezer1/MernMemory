import { signIn, signUp } from "../../Api/api"


export const signInNewProfile = (inputData, history) => async (dispatch) => {

    try{
        const {data} = await signIn(inputData)

        dispatch({type: "AUTH", data})
        history.push("/")
        
    }catch (error){
        console.log(error)
    }

    
}
export const signUpNewAccount = (inputData, history) => async (dispatch) => {

    try{
        const { data } = await signUp(inputData);
        dispatch({type: "AUTH", data})
        history.push("/")
    }catch(error){
        console.log(error)
    }

}
