import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from './logo.png';
import AuthService from './ui/AuthServise';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const jwtToken = AuthService.getJwtToken();
  const isAdmin = jwtToken && AuthService.getJwtTokenRole(jwtToken);

  const handleLogout = () => {
    AuthService.logout();
    navigate("/");
    window.location.reload();
  };


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
              <Nav.Link href='/'>Головна</Nav.Link>
              <Nav.Link href='/about'>Про нас</Nav.Link>
              {jwtToken && (
                isAdmin ? (
                  <Nav.Link href='/admin'>Адміністративна панель</Nav.Link>
                ) : (
                  <Nav.Link href='/dashboard'>Користувацька панель</Nav.Link>
                )
              )}
            </Nav>
            <Nav className='ms-auto'>
              {jwtToken ? (
                <Nav.Link onClick={handleLogout}>Вийти</Nav.Link>
              ) : (
                <Nav.Link href='/signin'>Увійти</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
