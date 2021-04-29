import React, { useState } from 'react'
import { SERVER_URL } from "../../config.json"
import axios from "axios"
import { Form, Button } from "react-bootstrap"
import Swal from "sweetalert2"

const EditItem = ({data}) => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const [updatedItem, setUpdatedItem] = useState({
        name: data.name,
        description: data.description,
        category: data.category,
        price: data.price
    })

    const onChangeHandler = (e) => {
        setUpdatedItem({
            ...updatedItem,
            [e.target.name]: e.target.value
        })
    }

    const token = localStorage.getItem('token')


    const onSubmitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('image', updatedItem.image);
        formData.append('description', updatedItem.description);
        formData.append('category', updatedItem.category);
        formData.append('price', updatedItem.price);
        formData.append('name', updatedItem.name);
        axios({
            method: 'PUT',
            url: `${SERVER_URL}/items/${data._id}`,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                "x-auth-token": token
            }
        })
            .then(res => Swal.fire("Success", res.data.msg, "success"))
            .catch(res => console.error(res))


    }

    const handleImage = (e) => {
        setUpdatedItem({ ...updatedItem, image: e.target.files[0] });
    }

    return (
        <div className="col-md-12 mx-auto"> 
			<div className="col-md-12 mx-auto login-form">
			<div class="container m-0 mb-4 p-0 d-flex text-center rounded border border-black">
				<div className="col-md-12 bg-black">
					<h5 className="m-0 p-0 py-3 text-white font-weight-bold">{updatedItem.name}</h5>
				</div>
			</div>
			<Form onSubmit={onSubmitHandler} method="ITEM">
				<Form.Group>
					<Form.Control className="p-4" type="text" placeholder="Name" name="name" value={updatedItem.name} onChange={onChangeHandler}/>
				</Form.Group>
				<Form.Group>
					<Form.Control type="text" className="p-4" placeholder="Price" name="price" value={updatedItem.price} onChange={onChangeHandler}/>
				</Form.Group>
				<Form.Group>
					<Form.Control type="text" className="p-4" placeholder="Description" name="description" value={updatedItem.description} onChange={onChangeHandler}/>
				</Form.Group>
				<Form.Group>
					<Form.Control type="text" className="p-4" placeholder="Category" name="category" value={updatedItem.category} onChange={onChangeHandler}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Image</Form.Label>
					<input type='file' name='image' className="p-4" onChange={handleImage} />
				</Form.Group>
				<div class="container m-0 p-0 rounded border">
					<button type="submit" className="bg-none border-none col-md-12 m-0 p-0">
						<div className="bg-black py-1 text-center rounded border hover text-white border-black">
							<h5 className="m-0 py-2 rounded font-weight-bold">Edit Item</h5>
						</div>
					</button>
				</div>
			</Form>
		</div>
		</div>
    )
}
export default EditItem