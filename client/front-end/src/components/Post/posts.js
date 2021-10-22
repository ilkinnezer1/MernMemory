import React from 'react'
import {CircularProgress} from "@material-ui/core"
import {Container, Row, Col} from "reactstrap"
import { useSelector } from 'react-redux'
import Post from './mainPost/post'
import "./posts.css"

const Posts = ({setCurrentId}) =>  {    
        const posts = useSelector(state => state.posts)
        return (
        !posts.length ? <CircularProgress size={'1 rem'}/> : (
            <Container className="container-fluid">
                <Row>
                {
                    posts.map(post => (
                        <Col sm={12} xl={6} md={6} lg={4}  key={post._id}>
                         <Post post={post} setCurrentId={setCurrentId}/>
                          </Col>
                    ))
                }
                </Row>
            </Container>
        
        )
    )
}

export default Posts
