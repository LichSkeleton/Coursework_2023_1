import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutUs: React.FC = () => {
    return (
        <Container className="my-5">
            <Row>
                <Col>
                    <h1>About Us</h1>
                    <p>Welcome to IT Courses Hub, your premier destination for high-quality IT courses and professional training. We're dedicated to helping you thrive in the ever-evolving world of technology.</p>
                    <p>At IT Courses Hub, our passion for technology and education drives us to provide you with the knowledge and skills necessary to succeed in the fast-paced field of information technology. We understand that staying up-to-date and relevant in the tech industry is crucial, and we're here to support your journey.</p>
                    <p>Our mission is simple: to offer affordable, accessible, and top-notch IT courses that empower you to launch your career or stay at the forefront of technological advancements. Whether you're a seasoned professional looking to expand your skill set or a beginner eager to explore the world of IT, IT Courses Hub is here to help you achieve your goals.</p>
                    <p>Our diverse range of courses covers a wide spectrum of IT specialties, from programming and web development to cybersecurity and data science. Our instructors are industry experts who are passionate about sharing their knowledge and helping you succeed. We offer both self-paced courses and live online classes, ensuring flexibility in your learning experience.</p>
                    <p>At IT Courses Hub, we value your growth and are committed to providing a platform that equips you with the tools you need to reach new heights in your career. Join us on this journey, and together, we'll build a brighter future in the world of technology.</p>
                </Col>
            </Row>
        </Container>
    );
};

export default AboutUs;
