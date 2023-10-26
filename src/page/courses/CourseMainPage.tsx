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
interface Author {
  id: number;
  fullname: string;
}

const CoursePage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesResponse, authorsResponse] = await Promise.all([
          axios.get('http://localhost:8081/courses'),
          axios.get('http://localhost:8081/authors'),
        ]);
        setCourses(coursesResponse.data);
        setAuthors(authorsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getAuthorFullname = (authorId: number) => {
    const author = authors.find((author) => author.id === authorId);
    return author?.fullname;
  };


  return (
    <>
      <Container fluid className="d-flex justify-content-center">
        <Row className="align-items-center">
          {courses.map((course) => {
            const authorFullname = getAuthorFullname(course.author_id);

            return (
              <Col key={course.id} sm={12} md={4} lg={3} xl={2} className="flex-grow-1">
                <Card className="mb-3">
                  <Card.Img
                    src={course.icon_url}
                    alt={course.name}
                    className="img-fluid"
                    style={{ height: 200 }}
                  />
                  <Card.Body>
                    <Card.Title>{course.name}</Card.Title>
                    <Card.Text>
                      <i className="bi bi-camera-video"></i> {authorFullname}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default CoursePage;