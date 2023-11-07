import React, { Component } from 'react';
import { Container, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import logo from './logo.png';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';

const Header: React.FC = () => {
  const isLoggedIn = useSelector(
    (state: IRootState) => !!state.auth.authData.accessToken
  );

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
              {isLoggedIn && (
                <Nav.Link href='/dashboard' className="justify-content-end">Dashboard</Nav.Link>
              )}
              {!isLoggedIn && (
                <Nav.Link href='/signin' className="justify-content-end">Sign In</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;