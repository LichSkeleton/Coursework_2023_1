import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FeedbackForm from './FeedbackForm';

const Footer: React.FC = () => {
  return (
    <Container fluid className="d-flex flex-column flex-grow-0 bg-dark text-white mt-5">
      <Row className="pt-3 pb-3 m-5">
        <Col sm={12} md={6} lg={4}>
          <h3>Наша компанія</h3>
          <p>
            Славимось ми тим що навчили багатьох українців розвиватися в сфері ІТ,
            якби Стів Джобс був би ще живий він залюбки купив підписку
            на нашому сайті.
          </p>
        </Col>
        <Col sm={12} md={6} lg={4}>
          <h3>Соціальні мережі</h3>
          <ul className="list-unstyled">
            <li>
              <a href="#" className="text-white">Facebook</a>
            </li>
            <li>
              <a href="#" className="text-white">Twitter</a>
            </li>
            <li>
              <a href="#" className="text-white">Instagram</a>
            </li>
          </ul>
        </Col>
        <Col sm={12} md={12} lg={4}>
          <h3>Зв'яжіться з нами</h3>
          <ul className="list-unstyled">
            <li>
              <p className="text-white">Пошта: info@example.com</p>
            </li>
            <li>
              <p className="text-white">Телефон: +1-555-555-5555</p>
            </li>
            <li>
              <p className="text-white">Адреса: Сториженцька 33</p>
            </li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col sm={12} >
          <FeedbackForm />
        </Col>
      </Row>
      <Row className="text-center m-4">
        <Col sm={12}>
          <p className="mb-0">Авторське право &copy; 2023 Приклад Домену</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
