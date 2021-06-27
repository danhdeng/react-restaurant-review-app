import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav,  Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function RestaurantNavbar({user, logout=f=>f}) {

    return (
      
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/restaurants">Restaurant Reviews</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link to={"/restaurants"} className="nav-link">
                        Restaurants
                    </Link>
                    { (user !==null) ? (
                        <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                            Logout {user.name}
                        </a>
                        ) : (            
                        <Link to={"/login"} className="nav-link">
                        Login
                        </Link>
                    )}
                {/* <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link> */}
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
