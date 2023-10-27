import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FeedbackForm from './FeedbackForm';


const Footer: React.FC = () => {
  return (
    <Container fluid className="d-flex flex-column flex-grow-0 bg-dark text-white ">
      <Row className="pt-3 pb-3">
        <Col sm={12} md={6} lg={4}>
          <h3>Our company</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            risus. Suspendisse lectus tortor, dignissim sit amet, auctor id,
            feugiat vivamus, justo.
          </p>
        </Col>
        <Col sm={12} md={6} lg={4}>
          <h3>Social media</h3>
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
          <h3>Contact us</h3>
          <ul className="list-unstyled">
            <li>
              <p className="text-white">Email: info@example.com</p>
            </li>
            <li>
              <p className="text-white">Phone: +1-555-555-5555</p>
            </li>
            <li>
              <p className="text-white">Address: 123 Main Street, Anytown, CA 12345</p>
            </li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col sm={12} >
          <FeedbackForm />
        </Col>
      </Row>
      <Row className="text-center">
        <Col sm={12}>
          <p className="mb-0">Copyright &copy; 2023 Example Domain</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;