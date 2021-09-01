import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {
	const dispatch = useDispatch()
	const loginUser = useSelector(s => s.loginUser);
	const { userInfo } = loginUser

	const logoutHandler = () => {
		dispatch(logout())
	}
	return (
		<header>
			<Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand >ShopNaija</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<LinkContainer to='/cart'>
								<Nav.Link ><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
							</LinkContainer>
							{
								userInfo ? (
									<NavDropdown title={userInfo.name} id='username' >
										<LinkContainer to='/profile'>
											<NavDropdown.Item ><i className='fas fa-user'></i> Profile</NavDropdown.Item>
										</LinkContainer>

										<NavDropdown.Item onClick={logoutHandler}><i className='fas fa-user'></i> Log Out</NavDropdown.Item>

									</NavDropdown>
								) :
									<LinkContainer to='/login'>
										<Nav.Link ><i className='fas fa-user'></i> Sign In</Nav.Link>
									</LinkContainer>
							}

							{
								userInfo && userInfo.isAdmin && (
									<NavDropdown title='Admin' id='adminmenu' >
										<LinkContainer to='/admin/userlist'>
											<NavDropdown.Item ><i className='fas fa-user'></i> Users</NavDropdown.Item>
										</LinkContainer>

										<LinkContainer to='/admin/productlist'>
											<NavDropdown.Item ><i className='fas fa-'></i> Products</NavDropdown.Item>
										</LinkContainer>
										<LinkContainer to='/admin/orderlist'>
											<NavDropdown.Item ><i className='fas fa-user'></i> Orders</NavDropdown.Item>
										</LinkContainer>
									</NavDropdown>
								)
							}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}

export default Header
