import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';

interface Course {
  id: number;
  author_id: number;
  name: string;
  description: string;
  icon_url: string;
  is_free: boolean;
}

const CoursePage = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Fetch the course data from your API
    axios.get('YOUR_API_URL_HERE')
      .then((response) => {
        // Assuming your API returns an array of courses
        setCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  return (
    <Container fluid className="d-flex justify-content-center">
      <Row className="align-items-center">
        {courses.map((course) => (
          <Col key={course.id} xs={12} sm={6} md={4} lg={3} xl={2} className="flex-grow-1">
            <Card className="mb-3">
              <Card.Img
                src={course.icon_url}
                alt={course.name}
                className="img-fluid"
                style={{ height: 200 }}
              />
              <Card.Body>
                <Card.Title>{course.name}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CoursePage;