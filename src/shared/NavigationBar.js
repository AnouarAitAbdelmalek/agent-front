import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  const username = sessionStorage.getItem('nom') + ' ' + sessionStorage.getItem('prenom');
  let isLoggedIn = sessionStorage.getItem('username') != null ? true : false;
  const path = window.location.origin;

  let loggedContent = isLoggedIn === true ? 
  <Navbar.Collapse id="responsive-navbar-nav">
  <Nav className="mr-auto">
    
  </Nav>
  <Nav>
    <NavDropdown alignRight title={username} id="collasible-nav-dropdown">
      <NavDropdown.Item>
        <Link
          to={{
            pathname: "/logout",
            state: { fromDashboard: true },
          }}
          className="nav-link text-dark"
        >
          <img
            src={path+"/images/logout.png"}
            alt="Logout"
            width="25"
          />
          Se déconnecter
        </Link>
      </NavDropdown.Item>
    </NavDropdown>
  </Nav>
</Navbar.Collapse> 
: "";

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      

      <Link
          to={{
            pathname: "/list",
            state: { fromDashboard: true },
          }}
          className="nav-link text-white"
        >
        <img src={path+"/images/ensa.png"} alt="Logo" width="50" /> 
        ENSA-PAY
        </Link>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      {loggedContent}
    </Navbar>
  );
}
