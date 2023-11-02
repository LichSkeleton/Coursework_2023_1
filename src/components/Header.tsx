import React, { Component } from 'react';
import { Container, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import logo from './logo.png';

const Header: React.FC = () => {
  return (
    <>
      <Navbar className='d-flex flex-column flex-grow-0' collapseOnSelect expand="md" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href='/'>
            <img
              src={logo}
              height="40"
              width="70"
              className='d-inline-block align-top'
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='mr-auto'>
              <Nav.Link href='/'>Home</Nav.Link>
              <Nav.Link href='/about'>About us</Nav.Link>
            </Nav>
            <Nav className='ms-auto'>
              <Nav.Link href='/signin' className="justify-content-end">Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;