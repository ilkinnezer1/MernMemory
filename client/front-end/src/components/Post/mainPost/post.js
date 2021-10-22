import React from 'react'
import {Card, CardBody, CardText, CardImg, CardTitle, CardSubtitle, Button, Container, Row, Col} from "reactstrap"
import {useDispatch} from "react-redux"
import "./post.css"
import {deleteThePost, likeNewPost} from "../../../REDUX/action/action"

  //Adding cards and specified by props coming from posts as a selector
//Styling with reactstrap
const Post = ({post, setCurrentId}) =>{
  const dispatch = useDispatch()

   //CARD ELEMENTS 
    return (
        <Container fluid className="container-fluid">
         <Card className="mb-5">
        <CardImg top width="auto" height="320px" src={post.selectedFile}/>
        <div className="editing">
        <CardTitle tag="h5">{post.name}</CardTitle> 
        <Button onClick={() =>setCurrentId(post._id)}>...</Button>
        </div>
        <CardBody>
          <CardTitle tag="h3">{post.title}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{post.tags.map(tag => `#${tag} `)}</CardSubtitle>
          <CardText>{post.message}</CardText>
          <div className="buttons">
          <Button color="primary" onClick={()=> dispatch(likeNewPost(post._id))}> Like {post.likes}</Button>
          <Button color="danger" onClick={()=> dispatch(deleteThePost(post._id))}>Delete</Button>
          </div>
        </CardBody>
      </Card>
        </Container>
        
    )
}

export default Post
