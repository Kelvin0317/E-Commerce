import React, { useEffect, useState } from "react"
import TopNav from "./Navbar"
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom"
import Login from "./components/forms/Login"
import Register from "./components/forms/Register"
import jwt_decode from "jwt-decode"
import { SERVER_URL } from './config.json'
import Item from "./components/Item"
import Cart from "./components/Cart"
import AddItem from "./components/forms/AddItem"
import Order from "./components/Order"
import Banner from "./layout/Banner"
import LayoutItem from "./layout/Item"
import Footer from "./layout/Footer"
import './App.css';
import Swal from "sweetalert2"


function App() {
	const [userData, setUserData] = useState({})
	const [token, setToken] = useState("")
	const [isLogin, setIsLogin] = useState(false)
	const [items, setItems] = useState([])

	const [myCart, setMyCart] = useState([])
	const [myOrder, setMyOrder] = useState([])

	// Get Items
	const getItems = () => {
		fetch(`${SERVER_URL}/items`)
			.then(res => res.json())
			.then(data => {
				setItems(data)
			})
			.catch(err => setItems([]))
	}

	// Get Cart
	const getMyCart = () => {
		fetch(`${SERVER_URL}/carts`, {
			method: 'GET',
			headers: {
				"x-auth-token": localStorage.getItem('token')
			}
		})
			.then(res => res.json())
			.then(data => 
				setMyCart(data.items)
				)
	}

	const getMyOrder = () => {
		fetch(`${SERVER_URL}/orders`, {
			method: 'GET',
			headers: {
				"x-auth-token": localStorage.getItem('token')
			}
		})
			.then(res => res.json())
			.then(data => 
				setMyOrder(data)
			)
	}
	
	
	useEffect(() => {
		getItems()
		getMyCart()
		getMyOrder()
	}, [])

	const showItems = items?.map(item => <Item key={item._id} data={item} getItems={getItems} />)
	const showOrders = <Order data={myOrder} getMyOrder={getMyOrder} />
	const showCarts = <Cart data={myCart} getMyCart={getMyCart} />

	// Handle Login
	const handleLogin = (user) => {
		let decoded = jwt_decode(user.token)
		setToken(user.token)
		setUserData(decoded)
		localStorage.setItem('userData', JSON.stringify(decoded))
		localStorage.setItem('token', user.token)
		setIsLogin(true)
	}

	// Handle Logout
	const handleLogout = () => {
		setToken()
		setUserData({})
		localStorage.removeItem('userData')
		localStorage.removeItem('token')
	}

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

	return (
		<Router>
			<div className="App">
				<TopNav userData={userData} handleLogout={handleLogout} isLogin={isLogin} />

				{/* {
    				localStorage.hasOwnProperty('token') && localStorage.hasOwnProperty('userData') ? 
    				<AddPost getPosts={getPosts} /> : null
    			} */}
				<Switch>
					<Route path="/Login">
						<Login handleLogin={handleLogin} />
					</Route>
					<Route path="/Register">
						<Register />
					</Route>
					<Route path="/Order">
					{!!myOrder?.length ? showOrders : 
						<div class="container mx-auto mt-5 d-flex text-center rounded border border-black">
							<div className="col-md-12 bg-black">
								<h5 className="text-white m-0 py-3 rounded text-white font-weight-bold">NO ORDER</h5>
							</div>
						</div>
					}
					</Route>
					<Route path="/Cart">
						{!!myCart?.length ? 
						<div>
							<div className="container-fluid d-flex">
								{showCarts} 
							</div>							
						</div>
						: 
						<div class="container mx-auto mt-5 d-flex text-center rounded border border-black">
							<div className="col-md-12 bg-black">
								<h5 className="text-white m-0 py-3 rounded text-white font-weight-bold">NO ITEMS IN CART</h5>
							</div>
						</div>
					}
					
					</Route>
					<Route path="/AddItem">
						<AddItem />
					</Route>
					<Route path="/">
						<Banner />
						<LayoutItem />
						{!!items?.length ? 
							<div className="container-fluid d-flex mb-5">
								{showItems} 
							</div>
						: <h1 className="noItems m-0 p-0 mt-5">ALL ITEMS ARE OUT OF STOCK FOR SOME REASON</h1>}
					</Route>
				</Switch>
				<Footer />
			</div>
		</Router>

	)
}

export default App;