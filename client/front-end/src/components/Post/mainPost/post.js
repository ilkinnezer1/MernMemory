import React from 'react'
import {Card, CardBody, CardText, CardImg, CardTitle, CardSubtitle, Button, Container, Row, Col} from "reactstrap"
import {useHistory} from "react-router-dom"
import {useDispatch} from "react-redux"
import "./post.css"
import {deleteThePost, likeNewPost} from "../../../REDUX/action/action"

  //Adding cards and specified by props coming from posts as a selector
//Styling with reactstrap
const Post = ({post, setCurrentId}) =>{
  const dispatch = useDispatch()
  const history = useHistory()
const user  = JSON.parse(localStorage.getItem("profile"))

const handleClick = () => {
  history.push(`/details/${post._id}`)
}

   //CARD ELEMENTS 
    return (
      <div className="Div">
         <Card className="pb-5 rounded cards d-flex word-wrap">
           <CardImg top height="200px" src={post.selectedFile} className="rounded view overlay w-100" onClick={handleClick}/>
        <div className="editing">
        <CardTitle tag="h5" className="title">{post.name}</CardTitle> 
        {(user?.result?._id===post?.creator) && <p className="dots" title="Edit" onClick={() =>setCurrentId(post._id)}>...</p>}
        </div>
        <CardBody>
          <div onClick={handleClick}>
          <CardTitle tag="h3" className="sec-title">{post.title}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted tags">{post.tags.map(tag => `#${tag} `)}</CardSubtitle>
          <CardText className="message">{post.message}</CardText>
          </div>
          <div className="buttons">
          <span className="like-button" onClick={()=> dispatch(likeNewPost(post._id))}> Like {post.likes.length}</span>
          {(user?.result?._id === post?.creator) && 
          <span className="delete-button" onClick={()=> dispatch(deleteThePost(post._id))}>Delete</span> }
          </div>
        </CardBody>
      </Card>
      </div>
    )
}

export default Post
