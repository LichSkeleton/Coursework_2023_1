import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const SignInPage: React.FC = () => {
  return (
    <>
      <Container className="my-5">
        <h1>Sign In</h1>
        <Form>
          <Form.Group className="my-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter your email address" />
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your password" />
          </Form.Group>
          <Button variant="primary" type="submit" className="my-3">Sign In</Button>
          <Button href="/signup" variant="primary" className="float-end my-3">Sign Up</Button>
        </Form>
      </Container>
    </>
  );
};

export default SignInPage;