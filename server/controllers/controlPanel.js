import mongoose from "mongoose"
import PostMessages from "../models/postMessages.js"

export const getPost = async (req, res) => {
     try{
        const postMessages = await PostMessages.find() // helps us to find specific collection in database
        res.status(200).json(postMessages) //Responging request with 200 status code
     }catch(error){
        res.status(404).json({message: error.message})
     }
}
//Getting specific post 
export const getSpecialPost = async (req, res) => {
    const {id} = req.params; //Identifies single post id 
    try{
        const posts  = await PostMessages.findById(id) // Finding posts with its id
        res.status(201).json(posts)
    }catch(error){
        res.status(401).json({message: error.message})
    }
}

export const createPost = async (req, res) => {
     //Request body helps us to find the post
     const postBody = req.body //specifies the data as a object
     const newPost = new PostMessages({...postBody, creator: req.userId}) //Takes all data and specifies
     try{
       await newPost.save() // Saving database 
     res.status(201).json(newPost) // sending new post to front
     }catch(error){
         console.log(error)
       res.status(409).json({message: error.message})
    }
}

export const updatePost = async (req, res) => {
     const {id: _id} = req.params;
     const post  = req.body
     //Checing validation of our uptaded post
     if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Invalid Id")
     //Sending the request to database for finding any post's id and send to the input data in front end
      const updatedPost = await PostMessages.findByIdAndUpdate(_id, {...post, _id},  {new: true})
     res.json(updatedPost)

}

//Deleting with request object to database
export const deletePost = async ( req, res) => {
    const {id} = req.params
    //Checking the existence of id in database
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("There is not any id in database")
    await PostMessages.findByIdAndRemove(id) //Removing from database
    res.status(200).json({message: "Post successfully deleted!"})
}   

//Adding like button functionality  
export const likePost = async (req, res) => {
    const {id} = req.params

    if(!req.userId) return res.json({message: "Unauthenticated"})
    //Checking existence of posts with id
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("There is not any id in database")

    const post = await PostMessages.findById(id)
    const index = post.likes.findIndex((id) => id === String(req.userId)) //That identifes if user liked it before post 

    if(index === -1){
        post.likes.push(req.userId)
    }else{
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }
    const likedPost = await PostMessages.findByIdAndUpdate(id, post, {new:  true}) //to increment specific target in database by clicking button
        res.status(200).json(likedPost) // Sending data to frontEnd
}
export const getPostbySearch = async (req, res) => {
         const {searchQuery, tags} = req.query //Receving query from front end 
    try{
        const title = new RegExp(searchQuery, "i") //Modify and make all search value same letter
        const posts = await PostMessages.find({$or: [{title}, {tags: {$in: tags.split(",")} } ]}) //Checking the existence of posts with specific title coming from search input
        res.status(201).json({data: posts}) // Sending specific posts 
     }catch(error){
        res.status(404).json({message: error.message})
     }
}   

//, {tags: {$in: tags.split(',')}}