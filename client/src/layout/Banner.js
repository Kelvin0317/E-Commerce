import React from "react"
import { Card, CardGroup, Carousel, Button, Modal } from "react-bootstrap"
import banner1 from "../image/banner1.jfif"
import banner2 from "../image/banner2.jfif"
import banner3 from "../image/banner3.jfif"
import banner4 from "../image/banner4.jfif"
import banner5 from "../image/banner5.jfif"
import banner6 from "../image/banner6.jfif"

const Footer = () => {
    return ( 
        <Carousel>
            <Carousel.Item interval={1000}>
                <img
                className="d-block w-100 tales"
                src={banner1}
                />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
                <img
                className="d-block w-100 tales"
                src={banner2}
                />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
                <img
                className="d-block w-100 tales"
                src={banner3}
                />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
                <img
                className="d-block w-100 tales"
                src={banner4}
                />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
                <img
                className="d-block w-100 tales"
                src={banner5}
                />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
                <img
                className="d-block w-100 tales"
                src={banner6}
                />
            </Carousel.Item>
        </Carousel> 
    )
}


export default Footer