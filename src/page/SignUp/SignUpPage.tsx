import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const SignUpPage: React.FC = () => {
    return (
        <>
            <Container>
                <h1 className="my-3">Sign Up</h1>
                <Form>
                    <Form.Group className="my-3">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your full name" />
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email address" />
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter your password" />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="my-3">
                        Sign Up
                    </Button>
                    <Button href="/signin" variant="primary" className="float-end my-3">
                        Sign In
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default SignUpPage;