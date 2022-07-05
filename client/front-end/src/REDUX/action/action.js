import {fetchPosts,
         createPost, 
         updatePost, 
         deletePost, 
         likePost,
         fetchPostsBySearch,
         fetchSinglePost} from "../../Api/api"
         //Sending data to reducer with different functions
         //THAT helps to reach data in reducer
 const getPost = () => async (dispatch) =>  {
    try{
        const {data} = await fetchPosts()
        dispatch({type: "FETCH_ALL" , payload: data})
    }catch(error){
        console.log(error)
    }
}
export default getPost

//Fetching single post 
export const getSinglePost = (id) => async (dispatch) => {
    try{
        const {data} = await fetchSinglePost(id)
        dispatch({type: "FETCH_SINGLE_POST", payload: data})
    }catch(error){
        console.log(error.message)
    }
}

export const getPostbySearch = (searchQuery) => async (dispatch) => {
    try {
        const {data:{data}} = await fetchPostsBySearch(searchQuery)
        dispatch({type: "SEARCH_ALL" , payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

//That makes new post to add database and also REDUX state
export const createNewPost = (post) => async (dispatch) => {
    try{
        const {data} = await createPost(post);
        dispatch({type: "CREATE_POST",  payload: data})
    }catch(error){
        console.log(error)
    }
}

//UPDATING new post and it has 2 paraneters 
//First parameter is the specific ID and second received data
export const updateNewPost = (id, receivedPostData) => async (dispatch) => {
    try{
      const {data}  =  await updatePost(id, receivedPostData)
      dispatch({type: "UPDATE_POST", payload: data})
    } catch(error){
        console.log(error)
    }
}
//Deleting post to send request backend. It also sends request to database to delete specific post from cluster
export const deleteThePost = (id) =>  async (dispatch) => {
    try{
        await deletePost(id)
        dispatch({type: "DELETE" , payload: id})
    }catch(error){
        console.log(error)
    }
}
//UPDATING LIKE BUTTON and after will add the authentication with JWT to make reacheable for everyone to add their like
export const likeNewPost = (id) => async (dispatch) => {
    try {
        const {data} = await likePost(id)
        dispatch({type:"LIKE_POST",  payload: data})
    } catch (error) {
        console.log(error)
    }
}




