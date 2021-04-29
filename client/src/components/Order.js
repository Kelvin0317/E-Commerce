import React from "react"
import { Card, CardGroup, Carousel, Button, Modal } from "react-bootstrap"
import { SERVER_URL } from '../config.json'

const Order = ({ data }) => {
    const date = data.map(items => items.purchased_date)
    console.log(date)
    return (
        <div class="container mx-auto mt-5 text-center rounded">
		    <div className="col-md-12 bg-black pt-3">
				<h5 className="text-white m-0 py-3 rounded text-white font-weight-bold">My Order</h5>
			</div>
            <div className="col-md-12 bg-black mt-5 pt-1">
                {data.map(items => 
                items.items.map(item =>
                <Card className="mt-3">
                    {/* <Card.Img variant='top' src={`${SERVER_URL}/${item.items}`} /> */}
                    <Card.Body className="m-0 pt-2 ">
                    <h1 className="m-0 p-0 pb-2 text-center border-bottom">{item.name}</h1>
                    <h4 className="py-2 m-0 text-dark text-center border-bottom">Quantity: {item.price}</h4>
                    <h4 className="py-2 m-0 text-dark text-center border-bottom">Price: RM{item.quantity * item.price}</h4>
                    <h4 className="py-2 m-0 text-dark text-center border-bottom">Date: {date}</h4>
                    </Card.Body>
                </Card>           
                )
                )}
			</div>
		</div>
    )
}

export default Order