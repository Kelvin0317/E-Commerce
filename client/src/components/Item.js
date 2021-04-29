import React, { useState } from "react"
import { Card, CardGroup, Carousel, Button, Modal } from "react-bootstrap"
import { SERVER_URL } from "../config.json"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import EditItem from "./forms/EditItem"

const Item = ({ data, getItems }) => {
    // const userData = JSON.parse(localStorage.getItem('userData'))
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('userData'))
    const admin = user?.user?.isAdmin;

    const [cart, setCart] = useState({
        itemId: data._id,
        quantity: ""    
    })

    const [price, setPrice] = useState({
        quantity: "0"
    })

    const addToCartHandler = (id) => {
        if(cart.quantity.length < 1) return Swal.fire('Error', "How much do you want to buy", 'error')

        fetch(`${SERVER_URL}/carts`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token
            },
            body: JSON.stringify(cart)
        })
            .then(res => res.json())
            .then(data => {
                Swal.fire(
                    'Item added to cart!',
                    data.msg,
                    'success'
                )
            })
            // .catch((e) => console.log(e))
    }

    const onChangeHandler = (e) => {
        setPrice({
            ...price,
            [e.target.name]: e.target.value
        })
        
        setCart({
            ...cart,
            [e.target.name]: e.target.value
        })

    }

    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const [editing, setEditing] = useState(false);

    const deleteHandler = (e) => {
        Swal.fire({
            title: 'Are you sure you want to delete this?',
            text: "You won't be able to revert it!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085D6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Bro, delete this.'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    fetch(`${SERVER_URL}/items/${data._id}`, {
                        method: 'DELETE',
                        headers: {
                            "x-auth-token": token
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            Swal.fire(
                                'DELETED!',
                                data.msg,
                                'success'
                            )
                            getItems()
                        })
                }
            })
        // console.log(data)
    }


    return (
        <div className='my-5 px-5 col-md-3'>
            {
            editing ? 
            <div>

            <EditItem data={data}
             /> 
            <div class="container m-0 p-0 ">
                <button onClick={() => setEditing(!editing)} className="bg-none border-none col-md-12 m-0 p-0">
					<div className="bg-primary py-1 text-center rounded border hover-primary text-white border-primary">
						<h5 className="m-0 py-2 rounded font-weight-bold">Cancel</h5>
					</div>
                </button>
                </div>
            </div>
             :
            <Card>
                <Card.Img variant='top' src={`${SERVER_URL}/${data.image}`} />
                <Card.Body className="m-0 pt-2">
                <h1 className="m-0 p-0 pb-2 text-center border-bottom">{data.name}</h1>
                <h4 className="py-2 m-0 text-dark text-center border-bottom">Price: RM{data.price}</h4>
                <div class="container m-0 p-0 rounded border mt-3">
					<button onClick={handleShow} className="bg-none border-none col-md-12 m-0 p-0">
						<div className="bg-black py-1 text-center rounded border hover text-white border-black">
							<h5 className="m-0 py-2 rounded font-weight-bold">View Item</h5>
						</div>
					</button>
				</div>
                {
                    !admin && user ?
                        <>
                            <div className=''>
                                <div class="container m-0 p-0 rounded border">
                                    <button onClick={handleShow1} className="bg-none border-none col-md-12 m-0 p-0">
                                        <div className="bg-danger py-1 text-center rounded border hover-danger text-white border-danger">
                                            <h5 className="m-0 py-2 rounded font-weight-bold">Add To Cart</h5>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            </>
                            :
                        <></>
                    }
                </Card.Body>
            </Card>
            }

            <Modal className="top-high" show={show1} onHide={handleClose1}>
                <div className="d-flex">
                    <div className="col-md-4 mt-2">
                        <Card.Img variant='top' src={`${SERVER_URL}/${data.image}`} />
                    </div>
                    <div className="col-md-4 mb-3">
                    <Modal.Title className="text-center mx-auto mt-4 "><h4>{data.name}</h4></Modal.Title>
                        <Modal.Body className="border-0 text-center ">These are curated collection of our best selling items.</Modal.Body>
                        <Modal.Footer className="border-0">
                            <button onClick={() => addToCartHandler(data._id)} className="bg-none border-none col-md-12 m-0 p-0">
                                <div className="bg-success py-1 text-center rounded border hover text-white border-success">
                                    <h5 className="m-0 py-2 rounded font-weight-bold">Buy</h5>
                                </div>
                            </button>
                            <button onClick={handleClose1} className="bg-none border-none col-md-12 m-0 p-0 mt-1">
                                <div className="bg-black py-1 text-center rounded border hover text-white border-black">
                                    <h5 className="m-0 py-2 rounded font-weight-bold">Cancel</h5>
                                </div>
                            </button>
                        </Modal.Footer>
                    </div>
                    <div className="col-md-4 mb-3">
                        <Modal.Title className="mx-auto mt-5 pt-5 border-bottom"><h4>Price: RM{data.price}</h4></Modal.Title>
                        <input type='number' name='quantity' className='w-100 p-2' onChange={onChangeHandler}/>
                        <Modal.Title className="mx-auto mt-2 border-bottom"><h4>Quantity: {price.quantity}</h4></Modal.Title>
                        <Modal.Title className="mx-auto mt-2"><h4>Total Price: RM{data.price * price.quantity}</h4></Modal.Title>
                    </div>
                </div>
            </Modal>

            {/* ITEM DETAILS */}
            <Modal className="p-5 d-flex modal2 mt-5" show={show} onHide={handleClose}>
                <Modal.Body className="border-0 m-0 d-flex">
                    <div className="col-md-4">
                        <Card.Img variant='top' src={`${SERVER_URL}/${data.image}`} />
                    </div>
                    <div className="col-md-8">
                        <h4 className="py-2 m-0 text-dark border-bottom">{data.name}</h4>
                        <h4 className="py-2 m-0 text-dark border-bottom">Price: RM{data.price}</h4>
                        <h4 className="py-2 m-0 text-dark border-bottom">Description: {data.description}</h4>
                        <h4 className="py-2 m-0 text-dark border-bottom">Categpry: {data.category}</h4>
                        {
                        admin ?
                        <>
                        <div className='d-flex mt-4'>
                            <div class="container m-0 p-0 rounded border">
                                <button onClick={deleteHandler}className="bg-none border-none col-md-12 m-0 p-0">
                                    <div className="bg-danger py-1 text-center rounded border hover-danger text-white border-danger">
                                        <h5 className="m-0 py-2 rounded font-weight-bold">Delete</h5>
                                    </div>
                                </button>
                            </div>
                            <div class="container m-0 p-0 rounded border">
                                <button onClick={() => setEditing(!editing)} className="bg-none border-none col-md-12 m-0 p-0">
                                    <div className="bg-primary py-1 text-center rounded border hover-primary text-white border-primary">
                                        <h5 className="m-0 py-2 rounded font-weight-bold">Edit</h5>
                                    </div>
                                </button>
                            </div>
                        </div>
                            </>
                            :
                        <></>
                    }
                    </div>
                </Modal.Body>
                <Modal.Footer className="border-0 ">
                <button onClick={handleClose} className="bg-none border-none col-md-12 m-0 p-0">
					<div className="bg-black py-1 text-center rounded border hover text-white border-black">
						<h5 className="m-0 py-2 rounded font-weight-bold">Close</h5>
					</div>
				</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Item