import React from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import "./about.css"

const Community = ()=>  {
    return (
        <div className="d-flex flex-column align-items-center mt-5">
        <div className="d-flex flex-column w-50 mb-4">
        <h5 className="text-success small">OUR WORLD-CLASS COMMUNITY</h5>
            <h1>About Us? It’s About You.</h1>
            <p className="h4">You are our reason for being. Whether you’re an aspiring entrepreneur 
                or an accomplished one, we do what we do to serve you. Our work will 
                never be done because entrepreneurial missions are big, visions are long, 
                and needs are ever-changing. We appreciate you and are here for you for the long haul.</p>
            <p className="h5 mt-3">
            The SPI community of like-minded entrepreneurs comes together and comes 
            alive most through our email subscription. We’d love to have you join if you haven’t already.
             It's forever free, filled with exclusive content, and always optional; you can easily unsubscribe anytime.
              See you on the inside!
            </p>
        </div>
        <div className="green-ambiance w-75 bg-image p-4 rounded d-flex align-items-center justify-space-around">
            <div className="ml-3">
            <h3 className="text-light">
                Want the inside scoop?
                </h3>
                <h1 className="text-light heading">Join The Community</h1>
                <p className="text-light w-75">
                Our email content is full of value, void of hype, tailored to your interests whenever possible, never pushy, and always free.
                </p>
            </div>
                <Link to="/">
                    <Button className="btn btn-light m-5 rounded show-button">Share Article</Button>
                </Link>
            </div>
</div>
    )
}

export default Community
