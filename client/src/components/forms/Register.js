import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { SERVER_URL } from "../../config.json"
import { useHistory, Link } from "react-router-dom"
import Swal from "sweetalert2"
// import { useHistory } from "react-router-dom"

const Register = () => {
    // const history = useHistory()
    const [user, setUser] = useState({
        fullname: "",
        email: "",
        password: "",
        password2: ""
    })

    const onChangeHandler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        // If statements
        if(user.fullname.length < 1) return Swal.fire('Error', "Please enter your first fullname", 'error')
        if(user.password.length < 8) return Swal.fire('Error', "Password has to be greater than 8", 'error')
        if(user.password == user.password2){        
            // console.log(user)
            fetch(`${SERVER_URL}/users/register`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(data => {
                Swal.fire({
                    icon: "success",
                    title: "Congratulations",
                    text: "On your successful registration brochure"
                })
                setUser({})
            })
            .catch(e => {
                Swal.fire({
                    icon: "error",
                    title: "Excuse me?",
                    text: "why are you trying to access register when you are already logged in?"
                })
            })
        }else{
            return Swal.fire('Error', "Those passwords didn’t match. Try again.", 'error')
        }
    }

    return (
        <div className="col-md-4 mx-auto mt-4 pt-5 login-form">
			<div class="container m-0 mb-4 p-0 d-flex text-center rounded border border-black">
				<div className="col-md-6 ">
					<h5 className="m-0 p-0 py-3 "><Link to="/Login" className="text-black font-weight-bold">LOGIN</Link></h5>
				</div>
				<div className="col-md-6 bg-black">
					<h5 className="text-white m-0 py-3 rounded"><Link to="/Register" className="text-white font-weight-bold">REGISTER</Link></h5>
				</div>
			</div>
			<Form onSubmit={onSubmitHandler} method="POST">
				<Form.Group>
					<Form.Control className="p-4" type="text" placeholder="FullName" name="fullname" value={user.fullname} onChange={onChangeHandler}/>
				</Form.Group>
				<Form.Group>
					<Form.Control type="email" className="p-4" placeholder="Email" name="email" value={user.email} onChange={onChangeHandler}/>
				</Form.Group>
                <Form.Group>
					<Form.Control type="password" className="p-4" placeholder="Password" name="password" value={user.password} onChange={onChangeHandler}/>
				</Form.Group>
                <Form.Group>
					<Form.Control type="password" className="p-4" placeholder="Check Password" name="password2" value={user.password2} onChange={onChangeHandler}/>
				</Form.Group>
				<div class="container m-0 mt-5 mb-4 p-0 rounded border">
					<button type="submit" className="bg-none border-none col-md-12 m-0 p-0">
						<div className="bg-black py-1 text-center rounded border hover text-white border-black">
							<h5 className="m-0 py-2 rounded font-weight-bold">Register</h5>
						</div>
					</button>
				</div>
			</Form>
		</div>
    )
}

export default Register