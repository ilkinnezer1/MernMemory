import React, {useEffect} from 'react'
import {Paper, Typography, CircularProgress, Divider} from "@material-ui/core"
import {useParams, useHistory} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { getSinglePost, getPostbySearch } from '../../REDUX/action/action'
import useStyles from "./styles"
import "./details.css"

const PostDetails = () => {  //Taking all posts from reducer
    const {post} = useSelector(state => state.posts)
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const {id} = useParams()

    useEffect(()=> {
        dispatch(getSinglePost(id))
    }, [id]) //Executing by changing id
    //Second useEffect will render depends on post

    // useEffect(() => {
    //     if(post){
    //       dispatch(getPostbySearch({search: "none",  tags: post?.tags.join(",")}))
    //     }
    // }, [post] )
          //  const recommendedPost = posts.filter(({_id}) => _id !== post._id)
          //  console.log(recommendedPost)
 //Map and render
      //CHECKING THE EXISTENCE OF SINGLE POST
      if(!post) return null;

    return (
    <Paper className="paper" style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
       <div className={classes.card}>
          <div className={classes.section}>
            <Typography className="text-white" variant="h3" component="h2">{post.title}</Typography>
          <Typography className="tags" gutterBottom variant="h6" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
            <Typography className="text-white" gutterBottom variant="body1" component="p">{post.message}</Typography>
              <Divider style={{ margin: '20px 0' }} />
              <Divider style={{ margin: '20px 0' }} />
            </div>
              <div className={classes.imageSection}>
             <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
              </div>
              </div>
       </Paper>
    )
}

export default PostDetails
