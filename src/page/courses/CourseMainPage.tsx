import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
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

interface CourseCategory {
  course_id: number;
  category_id: number;
}

const CoursePage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [courseCategories, setCourseCategories] = useState<CourseCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesResponse, authorsResponse, categoriesResponse, courseCategoriesResponse] = await Promise.all([
          axios.get('http://localhost:8081/courses'),
          axios.get('http://localhost:8081/authors'),
          axios.get('http://localhost:8081/categories'),
          axios.get('http://localhost:8081/courses_categories'),
        ]);
        setCourses(coursesResponse.data);
        setAuthors(authorsResponse.data);
        setCategories(categoriesResponse.data);
        setCourseCategories(courseCategoriesResponse.data);
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

  const handleCategorySelection = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const showAllPosts = () => {
    setSelectedCategory(null);
  };

  const renderCourses = () => {
    if (courses.length === 0) {
      return <p>No courses available.</p>;
    }

    // console.log('Selected Category:', selectedCategory);

    const freeCourses = courses.filter((course) => course.is_free);
    // console.log(freeCourses);
    let filteredCourses: Course[] = freeCourses;

    if (selectedCategory) {
      // Filter courseCategories based on the selected category
      const filteredCourseCategories = courseCategories.filter((courseCategory) => courseCategory.category_id === selectedCategory);
    
      // Extract the course_ids from the filteredCourseCategories
      const selectedCourseIds = filteredCourseCategories.map((courseCategory) => courseCategory.course_id);
    
      // Filter courses to only include those with ids in selectedCourseIds
      filteredCourses = freeCourses.filter((course) => selectedCourseIds.includes(course.id));
    
      // console.log('Filtered Course Categories:', filteredCourseCategories);
      // console.log('Selected Course Ids:', selectedCourseIds);
    }

    if (filteredCourses.length === 0) {
      return <div className='d-flex flex-grow-1 justify-content-center m-5'><div className="row mb-6 justify-content-center m-5"><h1 className='m-5'>No courses available for the selected category.</h1></div></div>
    }

    const renderedCourses = [];

    for (let i = 0; i < filteredCourses.length; i += 3) {
      renderedCourses.push(filteredCourses.slice(i, i + 3));
    }

    return (
      <Row className="d-flex justify-content-around flex-grow-1 m-5">
        {renderedCourses.map((courseGroup) => {
          return (
            <div key={courseGroup[0].id} className="row mb-3 justify-content-center">
              {courseGroup.map((course) => {
                const authorFullname = getAuthorFullname(course.author_id);

                return (
                  <Col key={course.id} className="col-md-12 col-lg-6 col-xl-3">
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
      <Col sm={4} md={3} lg={2} xl={1} className="m-5">
        <Button onClick={showAllPosts} className="mb-3">All</Button>
        <ListGroup>
          {categories.map((category) => {
            return (
              <ListGroupItem
                key={category.id}
                onClick={() => handleCategorySelection(category.id)}
                active={selectedCategory === category.id}
                action
              >
                {category.name}
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </Col>
    );
  };

  return (
    <Container fluid className="d-flex">
      {renderCourses()}
      {renderCategories()}
    </Container>
  );
};

export default CoursePage;
