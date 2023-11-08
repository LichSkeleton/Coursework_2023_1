import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { handleLogin } from '../SignCommon/Login';

const SignUpPage: React.FC = () => {
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegistration = async () => {
        try {
            const response = await fetch('http://localhost:8081/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullname, email, password }),
            });
    
            if (response.ok) {
                // Registration successful, now log in the user
                await handleLogin(email, password); // Call the login function immediately after registration
            } else {
                const data = await response.json();
    
                if (data.error === 'Email is already in use') {
                    alert('User with that email already exists. Please log in or use a different email.');
                } else {
                    alert('Registration failed. Please check your details and try again.');
                }
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };


    return (
        <>
            <Container>
                <h1 className="my-3">Sign Up</h1>
                <Form>
                    <Form.Group className="my-3">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your full name"
                            value={fullname}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </Form.Group>
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
                        onClick={handleRegistration}
                    >
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