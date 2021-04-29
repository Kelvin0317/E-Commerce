import React from "react"
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
// import { isEmpty } from "lodash"

const TopNav = ({ userData, handleLogout, isLogin }) => {
	const user = JSON.parse(localStorage.getItem('userData'))
    const admin = user?.user?.isAdmin;
	
	return (
		<div>
			<div className="text-center py-2 bg-primary">
				<h5 className="m-0 py-1 top text-white">Limited time event! Recommend friends to join Novelship for generous rewards.</h5>
			</div>
			<Navbar className='mz-auto nav py-4' sticky="top" bg="white" expand="md">
				<Navbar.Toggle aria-controls="menu" />
				<Navbar.Collapse id="menu">
					<Nav className="mr-auto pl-5 ml-5 my-2">	
						<Link to="/" className="nav-link text-white pl-4">Home</Link>
						<Link to="/" className="nav-link text-white">Home</Link>
						<Link to="/" className="nav-link text-white">Home</Link>
					</Nav>
					<Nav className="mx-auto pl-5">	
						<img
							src="/logo.png"
							width= "300"
							height= "100%"
							className="align-top"	
						/>
					</Nav>
					<Nav className="ml-auto">
						<h4 className="font-weight-bolder m-0 pr-4"><Link to="/" className="nav-link">Home</Link></h4>
						{
							"userData" in localStorage ?
								<React.Fragment>
									{
										!admin ?
										<>
										<h4 className="font-weight-bolder m-0 pr-4"><Link to="/cart" className="nav-link">Cart</Link></h4>
										<h4 className="font-weight-bolder m-0 pr-4"><Link to="/order" className="nav-link">Orders</Link></h4>
										</>
										:
										<></>
									}
									{
										admin ?
										<h4 className="font-weight-bolder m-0 pr-4"><Link to="/AddItem" className='nav-link'>Add Items</Link></h4>
										:
										<></>
									}
									<h4 className="font-weight-bolder m-0 pr-4"><Link to="/" className="nav-link" onClick={() => handleLogout()} >Logout</Link></h4>
								</React.Fragment>
								:
								<React.Fragment>
									<h4 className="font-weight-bolder m-0 pr-4"><Link to="/login" className="nav-link">Login</Link></h4>
									<h4 className="font-weight-bolder m-0 pr-4"><Link to="/register" className="nav-link">Register</Link></h4>
								</React.Fragment>
						}

					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	)
}

export default TopNav