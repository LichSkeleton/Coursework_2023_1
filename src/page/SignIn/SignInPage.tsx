import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { handleLogin } from '../SignCommon/Login';

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // After receiving the token in the response
  const handleLoginClick = () => {
    if(email && password){
    handleLogin(email, password);
    }else{
      alert('Заповніть будь ласка поля для входу');
    }
  };

  return (
    <>
      <Container className="my-5">
        <h1>Вхід</h1>
        <Form>
          <Form.Group className="my-3">
            <Form.Label>Пошта</Form.Label>
            <Form.Control
              type="email"
              placeholder="Введіть вашу електрону пошту"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введіть пароль"
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
            Увійти
          </Button>
          <Button href="/signup" variant="primary" className="float-end my-3">
            Зареєтруватись
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default SignInPage;