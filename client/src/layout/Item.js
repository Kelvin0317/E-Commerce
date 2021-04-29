import React, { useEffect, useState } from "react"
import { Card, CardGroup, Carousel, Button, Modal } from "react-bootstrap"
import shoes1 from "../image/shoes1.jpeg"
import shoes2 from "../image/shoes2.jpeg"
import shoes3 from "../image/shoes3.jpeg"
import shoes4 from "../image/shoes4.jpeg"
import shoes5 from "../image/shoes5.jfif"
import shoes6 from "../image/shoes6.jpeg"

const Item = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="">
            <div className="mx-auto px-auto d-flex my-4 col-md-6 text-center">
                <div className="mx-auto">
                    <h1 className="m-0 p-0">Most Popular</h1>
                    <Button variant="dark" onClick={handleShow}></Button>
                </div>
            </div>
            <Modal className="p-5 top-high" show={show} onHide={handleClose}>
                <Modal.Title className="text-center mx-auto mt-4 "><h4>Most Popular</h4></Modal.Title>
                <Modal.Body className="border-0 text-center ">These are curated collection of our best selling items.</Modal.Body>
                <Modal.Footer className="border-0 ">
                <button onClick={handleClose} className="bg-none border-none col-md-12 m-0 p-0">
					<div className="bg-black py-1 text-center rounded border hover text-white border-black">
						<h5 className="m-0 py-2 rounded font-weight-bold">GOT IT</h5>
					</div>
				</button>
                </Modal.Footer>
            </Modal>
            <div className="container-fluid d-flex text-center">
                <div className="col-md-3 p-3 px-5 border">
                    <img src={shoes1} class="d-block img-fluid w-100 shoes"/>
                    <div class="d-flex justify-content-between">
                        <p class="font-weight-bold">Court</p>
                        <p class="font-weight-bold">001</p>
                    </div>
                    <div>
                    <p>Adidas YEEZY 350 V2 "Linen" </p>
                    </div>
                </div>
                <div className="col-md-3 p-3 px-5 border">
                    <img src={shoes2} class="d-block img-fluid w-100 shoes"/>
                    <div class="d-flex justify-content-between">
                        <p class="font-weight-bold">Court</p>
                        <p class="font-weight-bold">001</p>
                    </div>
                    <div>
                    <p>Adidas YEEZY 350 V2 "Linen" </p>
                    </div>
                </div>
                <div className="col-md-3 p-3 px-5 border">
                    <img src={shoes3} class="d-block img-fluid w-100 shoes"/>
                    <div class="d-flex justify-content-between">
                        <p class="font-weight-bold">Court</p>
                        <p class="font-weight-bold">001</p>
                    </div>
                    <div>
                    <p>Adidas YEEZY 350 V2 "Linen" </p>
                    </div>
                </div>
                <div className="col-md-3 p-3 px-5 border">
                    <img src={shoes4} class="d-block img-fluid w-100 shoes"/>
                    <div class="d-flex justify-content-between">
                        <p class="font-weight-bold">Court</p>
                        <p class="font-weight-bold">001</p>
                    </div>
                    <div>
                    <p>Adidas YEEZY 350 V2 "Linen" </p>
                    </div>
                </div>
            </div>
        </div>
       )
}

export default Item