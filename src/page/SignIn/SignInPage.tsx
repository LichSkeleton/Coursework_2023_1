import React, { FormEvent, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { loginUser } from '../../store/auth/actionCreators';
import { useAppDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';

const SignInPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // console.log('login',login);
    // console.log('password',password);
    dispatch(loginUser({ login, password }));

    navigate('/dashboard');
  };

  return (
    <>
      <Container className="my-3">
        <h1>Sign In</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="my-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="mail" placeholder="Enter your email address" value={login} onChange={(e) => setLogin(e.target.value)} />
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit" className="my-3">Sign In</Button>
        </Form>
        <Button href="/signup" style={{width: "75%"}} variant="secondary" className="m-auto d-flex justify-content-center my-3">Sign Up</Button>
      </Container>
    </>
  );
};

export default SignInPage;