import React, {useState} from "react"
import { Form, Button } from "react-bootstrap"
import { SERVER_URL } from "../../config.json"
import { useHistory, Link } from "react-router-dom"
import Swal from "sweetalert2"

const Login = ({handleLogin}) => {
	const history = useHistory()
	const [user, setUser] = useState({
		email: "",
		password: ""
	})

	const onChangeHandler = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		})
	}

	const onSubmitHandler = (e) => {
		e.preventDefault()
        // console.log(token)
		fetch(`${SERVER_URL}/users/login`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(user)
		})
		.then(res => res.json())
		.then(token => {
			handleLogin(token)
		})
        .catch(e => {
            Swal.fire(
				'OOOOOPPSSSSSS',
				e.msg,
				'error'
			) 
        })
	}

	if(localStorage.hasOwnProperty('token') && localStorage.hasOwnProperty('userData')) {
        history.push("/")
    }

	return(
		<div className="col-md-4 mx-auto mt-4 pt-5 login-form">
			<div class="container m-0 mb-4 p-0 d-flex text-center rounded border border-black">
				<div className="col-md-6 bg-black">
					<h5 className="text-white m-0 py-3 rounded"><Link to="/Login" className="text-white font-weight-bold">LOGIN</Link></h5>
				</div>
				<div className="col-md-6">
					<h5 className="m-0 p-0 py-3"><Link to="/Register" className="text-black font-weight-bold">REGISTER</Link></h5>
				</div>
			</div>
			<Form onSubmit={onSubmitHandler} method="POST">
				<Form.Group>
					<Form.Control className="p-4" type="text" placeholder="Email" name="email" id="form1Example2" value={user.email} onChange={onChangeHandler}/>
				</Form.Group>
				<Form.Group>
					<Form.Control type="password" className="p-4" placeholder="Password" name="password" value={user.password} onChange={onChangeHandler}/>
				</Form.Group>
				{/* <Button variant="danger" type="submit">Login</Button> */}
				<div class="container m-0 mt-5 mb-4 p-0 rounded border">
					<button type="submit" className="bg-none border-none col-md-12 m-0 p-0">
						<div className="bg-black py-1 text-center rounded border hover text-white border-black">
							<h5 className="m-0 py-2 rounded font-weight-bold">LOGIN</h5>
						</div>
					</button>
				</div>
			</Form>
		</div>
	)
}

export default Login