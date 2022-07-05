import React from 'react'
import { Link } from 'react-router-dom'
import {Container} from "reactstrap"
import "./footer.css"

const Footer = () =>  {
    return (
        <Container fluid className="d-flex flex-column bg-light align-items-center text-center justify-content-center">
            <div className="text-muted h5 text-container">
            Provided by M.E.R.N Stack. Want to <Link className="text-muted" to='/aboutus'>learn more ?</Link>
        </div>
        <div className="text-muted d-flex logos">
            <span>I</span>
            <span>I</span>
            <span>I</span>
            <span>I</span>
            <span>I</span>
        </div>
        </Container>
        
    )
}

export default Footer
