import React, { useEffect, useState } from "react"
import { Card, CardGroup, Carousel, Button, Modal } from "react-bootstrap"
import Swal from "sweetalert2"
import { SERVER_URL } from '../config.json'
// import Item from "./Item"

const Cart = ({ data}) => {
    const [cart, setCart] = useState([])


    const checkoutHandler = () => {
        Swal.fire({
            title: "You sure you wanna checkout?",
            text: "Please say yes, I need money",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085D6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Imma checkout Darling!"
        })  
        .then((result) => {
            if (result.isConfirmed) {
                fetch(`${SERVER_URL}/orders`, {
                    method: 'POST',
                    headers: {
                        "x-auth-token": localStorage.getItem("token")
                    }
                })
                .then(res => res.json())
                .then(data => {
                    Swal.fire({
                        title: "Checkout successful!",
                        text: "You did it!",
                        icon: 'success'
                    })
                })
            }
        })
    }

    const getCart = () => {
		fetch(`${SERVER_URL}/carts`, {
			method: 'GET',
			headers: {
				"x-auth-token": localStorage.getItem('token')
			}
		})
			.then(res => res.json())
			.then(data => 
				setCart(data)
				)
	}

    const deleteHandler = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be ablt to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085D6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })  
        .then((result) => {
            if (result.isConfirmed) {
                fetch(`${SERVER_URL}/carts/${id}`, {
                    method: 'DELETE',
                    headers: {
                        "x-auth-token": localStorage.getItem("token")
                    }
                })
                .then(res => res.json())
                .then(data => {
                    Swal.fire(
                        'DELETED!',
                        data.msg,
                        'success'
                    )
                })
            }
        })
    }

    const delete1 = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be ablt to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085D6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })  
        .then((result) => {
            if (result.isConfirmed) {
                fetch(`${SERVER_URL}/carts/empty/`+id, {
                    method: 'DELETE',
                    headers: {
                        "x-auth-token": localStorage.getItem("token")
                    }
                })
                .then(res => res.json())
                .then(data => {
                    Swal.fire(
                        'DELETED!',
                        data.msg,
                        'success'
                    )
                })
            }
        })
		}
        
    useEffect(() => {
		getCart()
	}, [])

    return (
        <div class="container mx-auto mt-5  text-center rounded">
		    <div className="col-md-12 bg-black">
				<h5 className="text-white m-0 py-3 rounded text-white font-weight-bold">My Cart</h5>
			</div>
            <div className="col-md-12 d-flex bg-black py-1 mt-5 pb-3">
                {data.map(item => 
                <Card className="mt-3 col-md-4">
                    <Card.Img variant='top' src={`${SERVER_URL}/${item.image}`} />
                    <Card.Body className="m-0 pt-2">
                    <h1 className="m-0 p-0 pb-2 text-center border-bottom">{item.name}</h1>
                    <h4 className="py-2 m-0 text-dark text-center border-bottom">Quantity: {item.quantity}</h4>
                    <h4 className="py-2 m-0 text-dark text-center border-bottom">Price: RM{item.subtotal}</h4>
                    <button onClick={() => deleteHandler(item.itemId)} className="bg-none border-none col-md-12 mt-3 m-0 p-0">
                        <div className="bg-danger py-1 text-center rounded border hover-danger text-white border-danger">
                            <h5 className="m-0 py-2 rounded font-weight-bold">Cancel Item</h5>
                        </div>
                    </button>
                    </Card.Body>
                </Card>           
                )}
			</div>
                <button onClick={checkoutHandler} className="bg-none border-none col-md-12 m-0 p-0 mt-5">
					<div className="bg-success py-1 text-center rounded border hover-success text-white border-success">
						<h5 className="m-0 py-2 rounded font-weight-bold">Checkout</h5>
					</div>
				</button>
                <div class="container m-0 p-0 rounded mb-5 pb-5 border mx-auto">
					<button onClick={() => delete1(cart._id)} className="bg-none border-none col-md-12 m-0 p-0">
					<div className="bg-danger py-1 text-center rounded border hover-danger text-white border-danger">
						<h5 className="m-0 py-2 rounded font-weight-bold">Clean Cart</h5>
					</div>
				</button>
			</div>            
		</div>
    )
}

export default Cart