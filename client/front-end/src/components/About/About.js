import React from 'react'
import {Container, Media} from "reactstrap"
import "./about.css"
import Community from './Community'


const About = () => {
    return (
        <>
        <Container fluid className=" p-0 mb-4">
            <div className="d-flex">
               <div className="text-container">
                   <div className="text-wrapper">
                   <h1 className="title-main">
                   Welcome to ASR. We’re glad and grateful you’re here.
                   </h1>
                   <p className="main-text">
                   SPI exists to provide a trusted learning and development
                    ecosystem for online entrepreneurs. We are honored to help folks at 
                    all stages of their journey make progress toward new levels of success.
                     Whether you’re an aspiring entrepreneur or an accomplished one, we’re here for you.
                   </p>
                   </div>
                   </div> 
                   <Media object src="/about.jpeg" className="w-50 wrapper-image opacity-75 mr-0"/>
                   </div>
                   <Community/>
        </Container>
        </>
    )
}

export default About
