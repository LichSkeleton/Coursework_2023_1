import React, { Component } from 'react';
import { Container, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import logo from './logo.png';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from '../page/courses/CourseMainPage';
import SignInPage from '../page/SignIn/SignInPage';
import SignUpPage from '../page/SignUp/SignUpPage';

const Header: React.FC = () => {
  return (
    <>
      {/* <Navbar fixed='top' collapseOnSelect expand="md" bg="dark" variant="dark"> */}
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href='/'>
            <img
              src= {logo}
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
          </Navbar.Collapse>
          <Nav className="d-flex justify-content-end">
              <Nav.Link href='/signin'>Sign In</Nav.Link>
          </Nav>
          {/* <Form className="d-flex justify-content-end">
            <FormControl
              type='text'
              placeholder='Search'
              className='mr-sm-2'
            />
            <Button variant='outline-info'>Search</Button>
          </Form> */}
        </Container>
      </Navbar>

      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/signin" Component={SignInPage} />
          <Route path="/signup" Component={SignUpPage} />
        </Routes>
      </Router>
    </>
  );
};

export default Header;