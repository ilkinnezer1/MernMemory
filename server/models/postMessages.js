import mongoose from "mongoose";

const postSchema = mongoose.Schema({ //Creating a collection and its properties
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String, 
    likes: { 
        type: [String], 
        default: []},
     createdAt: { 
         type: Date,
         default: new Date()}
})


//Creating a model in database cluster
const PostMessages = mongoose.model("newPostMessages" , postSchema) 

export default PostMessages;