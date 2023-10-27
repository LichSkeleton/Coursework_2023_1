import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle, Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
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

interface Category {
  id: number;
  name: string;
}

const CoursePage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesResponse, authorsResponse, categoriesResponse] = await Promise.all([
          axios.get('http://localhost:8081/courses'),
          axios.get('http://localhost:8081/authors'),
          axios.get('http://localhost:8081/categories'),
        ]);
        setCourses(coursesResponse.data);
        setAuthors(authorsResponse.data);
        setCategories(categoriesResponse.data);
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

  const renderCourses = () => {
    if (courses.length === 0) {
      return <p>No courses available.</p>;
    }

    // Filter the courses where is_free is true
    const freeCourses = courses.filter((course) => course.is_free);

    if (freeCourses.length === 0) {
      return <p>No free courses available.</p>;
    }

    const renderedCourses = [];

    for (let i = 0; i < freeCourses.length; i += 3) {
      renderedCourses.push(freeCourses.slice(i, i + 3));
    }

    return (
      <Row className="d-flex justify-content-around m-5">
        {renderedCourses.map((courseGroup) => {
          return (
            <div key={courseGroup[0].id} className="row mb-3 justify-content-center">
              {courseGroup.map((course) => {
                const authorFullname = getAuthorFullname(course.author_id);

                return (
                  <Col key={course.id} className="col-sm-6 col-md-4 col-lg-3">
                    <Card>
                      <CardImg src={course.icon_url} alt={course.name} className="img-fluid" style={{ width: '100%', height: 150 }} />
                      <CardBody>
                        <CardTitle>{course.name}</CardTitle>
                        <CardText>
                          <i className="bi bi-camera-video"></i> {authorFullname}
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>
                );
              })}
            </div>
          );
        })}
      </Row>
    );
  };


  const renderCategories = () => {
    return (
      <Col sm={4} md={3} lg={2} xl={1} className='m-5'>
        <ListGroup className="mt-3">
          {categories.map((category) => {
            return (
              <ListGroupItem key={category.id}>
                {category.name}
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </Col>
    );
  };

  return (
    <Container fluid className="d-flex flex-grow-1">
        {renderCourses()}
        {renderCategories()}
    </Container>
  );
};

export default CoursePage;