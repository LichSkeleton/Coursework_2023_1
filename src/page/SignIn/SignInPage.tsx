import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import AuthServise from '../../components/ui/AuthServise';
import { UsersServise } from '../../services/server_conn';
import { handleLogin } from '../SignCommon/Login';

interface User{
  email: string;
  password: string;
  admin: boolean;
}

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User>();

  // After receiving the token in the response
  const handleLoginClick = () => {
    handleLogin(email, password);
  };

  return (
    <>
      <Container className="my-5">
        <h1>Sign In</h1>
        <Form>
          <Form.Group className="my-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="button"
            className="my-3"
            onClick={handleLoginClick}
          >
            Sign In
          </Button>
          <Button href="/signup" variant="primary" className="float-end my-3">
            Sign Up
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default SignInPage;