import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Nav, Row, Tab, TabContent } from 'react-bootstrap';
import { AuthorsServise, CategoriesServise, CoursesServise, PackagesServise } from '../../services/server_conn';
import axios from 'axios';

interface Course {
    id: number;
    author_id: number;
    name: string;
    description: string;
    icon_url: string;
    resource_url: string;
    is_free: boolean;
}

interface Packages {
    id: number;
    name: string;
    price: number;
    months_available: number;
}


interface Author {
    id: number;
    fullname: string;
    photo_url: string;
}

interface Category {
    id: number;
    name: string;
}

const MainAdmins: React.FC = () => {

    const [courses, setCourses] = useState<Course[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [packages, setPackgages] = useState<Packages[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const coursesResponse = await CoursesServise.getAll();
                setCourses(coursesResponse);
                const authorsResponse = await AuthorsServise.getAll();
                setAuthors(authorsResponse);
                const categoriesResponse = await CategoriesServise.getAll();
                setCategories(categoriesResponse);
                const packagesResponse = await PackagesServise.getAll();
                setPackgages(packagesResponse);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteCourse = async (courseId: number) => {
        const confirmation = window.confirm("Are you sure you want to delete this course?");

        if (confirmation) {
            try {
                const [delResponse] = await Promise.all([
                    axios.delete(`http://localhost:8081/deleteCourse/${courseId}`),
                ]);
                // console.log(delResponse);
                window.location.reload();
            } catch (error: any) { // Specify 'error' as any type
                console.error('Error:', error);
            }
        }
    };
    const handleDeletePackage = async (packageId: number) => {
        const confirmation = window.confirm("Are you sure you want to delete this package?");

        if (confirmation) {
            try {
                const [delResponse] = await Promise.all([
                    axios.delete(`http://localhost:8081/deletePackage/${packageId}`),
                ]);
                // console.log(delResponse);
                window.location.reload();
            } catch (error: any) { // Specify 'error' as any type
                console.error('Error:', error);
            }
        }
    };
    const handleDeleteAuthor = async (authorId: number) => {
        const confirmation = window.confirm("Are you sure you want to delete this author?");

        if (confirmation) {
            try {
                const [delResponse] = await Promise.all([
                    axios.delete(`http://localhost:8081/deleteAuthor/${authorId}`),
                ]);
                // console.log(delResponse);
                window.location.reload();
            } catch (error: any) { // Specify 'error' as any type
                console.error('Error:', error);
            }
        }
    };
    const handleDeleteCategory = async (categoryId: number) => {
        const confirmation = window.confirm("Are you sure you want to delete this category?");

        if (confirmation) {
            try {
                const [delResponse] = await Promise.all([
                    axios.delete(`http://localhost:8081/deleteCategory/${categoryId}`),
                ]);
                // console.log(delResponse);
                window.location.reload();
            } catch (error: any) { // Specify 'error' as any type
                console.error('Error:', error);
            }
        }
    };

    return (
        <>
            <div className='w-100'>
                <Tab.Container id="left-tabs-example" defaultActiveKey="navCourses">
                    <Row className='m-2' style={{ minHeight: "400px" }}>
                        <Col sm={2}>
                            <Nav variant="pills" className="flex-column mt-2">
                                <Nav.Item>
                                    <Nav.Link eventKey="navCourses">Курси</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="navPackages">Пакети послуг</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="navAuthors">Автори</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="navCategories">Категорії</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm="10">
                            <TabContent>
                                <Tab.Pane eventKey="navCourses">
                                    <Container>
                                        <Row className='m-2'>
                                            <Col className='d-flex justify-content-end m-2'>
                                                <Link className="btn btn-success" to={{ pathname: `/admin/createcourse/` }}>Створити новий курс</Link>
                                            </Col>
                                        </Row>
                                        <Row className='d-flex'>
                                            {courses.map((course) => {
                                                return (
                                                    <Col sm={10} md={5} xl={3} className='d-flex flex-column align-items-center border m-2'>
                                                        <div className='flex-grow-1 text-center m-2'>{course.name}</div>
                                                        <div style={{
                                                            backgroundImage: `url(${course.icon_url})`,
                                                            backgroundSize: 'cover',
                                                            backgroundRepeat: 'no-repeat',
                                                            backgroundPosition: 'center center',
                                                            height: '150px',
                                                            width: '100%',
                                                        }} />
                                                        <div style={{ minWidth: '50%' }} className='text-center m-1'><a className="btn btn-danger w-100" onClick={() => handleDeleteCourse(course.id)}>Видалити</a></div>
                                                    </Col>
                                                );
                                            })}

                                        </Row>
                                    </Container>
                                </Tab.Pane>
                                <Tab.Pane eventKey="navPackages">
                                    <Container>
                                        <Row className='m-2'>
                                            <Col className='d-flex justify-content-end m-2'>
                                                <Link className="btn btn-success" to={{ pathname: `/admin/createpackage/` }}>Створити новий пакет послуг</Link>
                                            </Col>
                                        </Row>
                                        <Row className='d-flex'>
                                            {packages.map((myPackage) => {
                                                return (
                                                    <Col sm={10} md={5} xl={3} className='d-flex flex-column align-items-center border m-2'>
                                                        <div className='flex-grow-1 text-center m-2'>{myPackage.name}</div>
                                                        <div className='text-center m-2'>{myPackage.price} грн</div>
                                                        <div style={{ minWidth: '50%' }} className='text-center m-1'><a className="btn btn-danger w-100" onClick={() => handleDeletePackage(myPackage.id)}>Видалити</a></div>
                                                    </Col>
                                                );
                                            })}
                                        </Row>
                                    </Container>
                                </Tab.Pane>
                                <Tab.Pane eventKey="navAuthors">
                                    <Container>
                                        <Row className='m-2'>
                                            <Col className='d-flex justify-content-end m-2'>
                                                <Link className="btn btn-success" to={{ pathname: `/admin/createauthor/` }}>Створити нового автора</Link>
                                            </Col>
                                        </Row>
                                        <Row className='d-flex'>
                                            {authors.map((author) => {
                                                return (
                                                    <Col sm={10} md={5} xl={3} className='d-flex flex-column align-items-center border m-2'>
                                                        <div className='flex-grow-1 text-center m-2'>{author.fullname}</div>
                                                        <div style={{
                                                            backgroundImage: `url(${author.photo_url})`,
                                                            backgroundSize: 'cover',
                                                            backgroundRepeat: 'no-repeat',
                                                            backgroundPosition: 'center center',
                                                            height: '180px',
                                                            width: '180px',
                                                        }} />
                                                        <div style={{ minWidth: '50%' }} className='text-center m-1'><a className="btn btn-danger w-100" onClick={() => handleDeleteAuthor(author.id)}>Видалити</a></div>
                                                    </Col>
                                                );
                                            })}
                                        </Row>
                                    </Container>
                                </Tab.Pane>
                                <Tab.Pane eventKey="navCategories">
                                    <Container>
                                        <Row className='m-2'>
                                            <Col className='d-flex justify-content-end m-2'>
                                                <Link className="btn btn-success" to={{ pathname: `/admin/createcategory/` }}>Створити нову категорію</Link>
                                            </Col>
                                        </Row>
                                        <Row className='d-flex'>
                                            {categories.map((category) => {
                                                return (
                                                    <Col sm={10} md={5} xl={3} className='d-flex flex-column align-items-center border m-2'>
                                                        <div className='flex-grow-1 text-center m-2'>{category.name}</div>
                                                        <div style={{ minWidth: '50%' }} className='text-center m-1'><a className="btn btn-danger w-100" onClick={() => handleDeleteCategory(category.id)}>Видалити</a></div>
                                                    </Col>
                                                );
                                            })}
                                        </Row>
                                    </Container>
                                </Tab.Pane>
                            </TabContent>
                        </Col>
                    </Row>
                </Tab.Container>
            </div >
        </>
    );
};

export default MainAdmins;