import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import Swal from "sweetalert2"
import { useHistory, Link } from "react-router-dom"
import { SERVER_URL } from '../../config.json'
import axios from "axios"

const AddItem = ({getItem}) => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('userData'))

    const [item, setItem] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
		image: ""
    })

	const onChangeHandler = (e) => {
		setItem({
			...item,
			[e.target.name]: e.target.value
		})
	}

	const onSubmitHandler = (e) => {
		e.preventDefault()
		const formData = new FormData();
		formData.append('name', item.name)
		formData.append('price', item.price)
		formData.append('description', item.description)
		formData.append('category', item.category)
		formData.append('image', item.image)

		axios({
			method: 'POST',
			url: `${SERVER_URL}/items`,
			data: formData,
			headers: {
				"Content-Type": "multipart/form-data",
				"x-auth-token": token
			}
		})
		.then(res => Swal.fire("Niceee", res.data.msg, "success"))
		.catch(res => console.log(res))
	}
	
	const handleImage = (e) => {
		setItem({
			...item,
			image: e.target.files[0]
		})
	}
	
    return (
		<div className="col-md-6 mx-auto"> 
			<div className="col-md-12 mx-auto mt-4 pt-5 login-form">
			<div class="container m-0 mb-4 p-0 d-flex text-center rounded border border-black">
				<div className="col-md-12 bg-black">
					<h5 className="m-0 p-0 py-3 text-white font-weight-bold"></h5>
				</div>
			</div>
			<Form onSubmit={onSubmitHandler} method="ITEM">
				<Form.Group>
					<Form.Control className="p-4" type="text" placeholder="Name" name="name" value={item.name} onChange={onChangeHandler}/>
				</Form.Group>
				<Form.Group>
					<Form.Control type="text" className="p-4" placeholder="Price" name="price" value={item.price} onChange={onChangeHandler}/>
				</Form.Group>
				<Form.Group>
					<Form.Control type="text" className="p-4" placeholder="Description" name="description" value={item.description} onChange={onChangeHandler}/>
				</Form.Group>
				<Form.Group>
					<Form.Control type="text" className="p-4" placeholder="Category" name="category" value={item.category} onChange={onChangeHandler}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Image</Form.Label>
					<div class="container m-0 p-0 rounded border">
						<div className="py-1 text-center rounded border text-white border-black">
							<input type='file' name='image' className="custom-file-input" onChange={handleImage} />
						</div>
					</div>
					
				</Form.Group>
				<div class="container m-0 mt-5 mb-4 p-0 rounded border">
					<button type="submit" className="bg-none border-none col-md-12 m-0 p-0">
						<div className="bg-black py-1 text-center rounded border hover text-white border-black">
							<h5 className="m-0 py-2 rounded font-weight-bold">Add Item</h5>
						</div>
					</button>
				</div>
			</Form>
		</div>
		</div>
    )
}

export default AddItem