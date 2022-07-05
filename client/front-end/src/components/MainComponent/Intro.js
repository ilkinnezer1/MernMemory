import React from 'react'
import "./Intro.css"
const Intro = () => {
    return (
        <div className="container-main">
            <div className="container">
            <div className="row">
            <div className="mt-4 logo col-xl-6 col-lg-6 col-md-5 col-sm-12 col-xs-12 col-12">
                <h1 className="title-spi">SPI</h1>
                <p className="description">Share Posts Instantenously</p>
            </div>
            <div className="mt-5 text-container text col-xl-6 col-lg-6 col-md-7 col-sm-12 col-xs-12 col-12">
                <p className="intro-text">
                Welcome to the SPI blog, where you'll find how-tos, success stories, interviews, reviews, special announcements and promotions, and much more.
                </p>
            </div>
            </div>
            </div>
        </div>
    )
}

export default Intro
