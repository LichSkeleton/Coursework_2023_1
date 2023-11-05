import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthorsServise, CoursesServise, CoursesVideosServise } from '../../../services/server_conn';
import { Button, Card, Col, Container, Nav, Row, Tab } from 'react-bootstrap';

interface Course {
    id: number;
    author_id: number;
    name: string;
    description: string;
    icon_url: string;
    resource_url: string;
    is_free: boolean;
}

interface CourseVideos {
    id: number;
    course_id: number;
    name: string;
    short_description: string;
    resource_video_url: string;
}

interface Author {
    id: number;
    fullname: string;
    photo_url: string;
}

const AuthorManage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [course, setCourses] = useState<Course>();
    const [author, setAuthor] = useState<Author>();
    const [courseVideos, setCourseVideos] = useState<CourseVideos[]>([]);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const dataCourse = await CoursesServise.getById(id);
                setCourses(dataCourse)

                const dataAuthor = await AuthorsServise.getById(dataCourse.author_id);
                setAuthor(dataAuthor);

                const dataCourseVideos = await CoursesVideosServise.getAllById(id);
                setCourseVideos(dataCourseVideos);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    if (!course?.name) return <div style={{ width: '100%', textAlign: 'center' }}><h1>Loading....</h1></div>;
    //   if (course?.is_free == false) navigate('/', { replace: true });

    const getVideoIdFromUrl = (url: string) => {
        // Regular expression to match YouTube video URLs
        const youtubeRegExp = /(?:\?v=|&v=|youtu\.be\/|\/embed\/)([^?&/]+)/;

        // Check if the URL matches the YouTube pattern
        const match = youtubeRegExp.exec(url);

        if (match && match[1]) {
            return match[1];
        } else {
            return null;
        }
    };
    return (
        <Container className='border p-3'>
            <Row className="mb-4">
                <div>
                    <Link className="btn btn-secondary" to={{ pathname: `/admin/` }}>Назад</Link>
                </div>
            </Row>
            <Row className="d-flex justify-content-center align-items-center justify-content-around">
                <Col sm={5}>
                    <img className='d-block m-auto' src={course?.icon_url} alt={course?.name} style={{ padding: '5%', height: '240px', width: '400px' }} />
                </Col >
                <Col sm={3}><h3>Посилання:</h3></Col>
                <Col sm={4}><textarea value={course?.icon_url} style={{ width: '100%' }}></textarea></Col>
            </Row>
            <Row className="d-flex justify-content-center align-items-center justify-content-around mb-4">
                <Col sm={4}><h3 style={{ marginLeft: '9%' }}>Повне ім'я автора:</h3></Col>
                <Col sm={8}><textarea value={author?.fullname} style={{ width: '100%' }}></textarea></Col>
            </Row>
            <Row className="d-flex justify-content-center align-items-center justify-content-around">
                <Col sm={5}>
                    <div className='m-auto mb-4' style={{
                        backgroundImage: `url(${author?.photo_url})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                        height: '250px',
                        width: '250px',
                    }} />
                </Col>
                <Col sm={3}><h3>Посилання:</h3></Col>
                <Col sm={4}><textarea value={author?.photo_url} style={{ width: '100%' }}></textarea></Col>
            </Row>
            <Row className="d-flex justify-content-center align-items-center justify-content-around mb-4">
                <Col sm={4}><h3 style={{ marginLeft: '9%' }}>Ім'я курсу:</h3></Col>
                <Col sm={8}><textarea value={course?.name} style={{ width: '100%' }}></textarea></Col>
            </Row>
            <Row className="d-flex justify-content-center align-items-center justify-content-around mb-4">
                <Col sm={4}><h3 style={{ marginLeft: '9%' }}>Опис:</h3></Col>
                <Col sm={8}><textarea value={course?.description} style={{ minHeight: '300px', width: '100%' }}></textarea></Col>
            </Row>

            {courseVideos.map((courseVideo) => {
                return (
                    <>
                        <Row className="d-flex justify-content-center align-items-center justify-content-around mb-1">
                            <Col sm={4}><h3 style={{ marginLeft: '9%' }}>Ім'я випуску:</h3></Col>
                            <Col sm={8}><textarea value={courseVideo?.name} style={{ width: '100%' }}></textarea></Col>
                        </Row>

                        <Row className="d-flex justify-content-center align-items-center justify-content-around mb-4">
                            <Col sm={5}>
                                <div className="video-player border">
                                    <iframe
                                        width="100%"
                                        height="300px"
                                        src={`https://www.youtube.com/embed/${getVideoIdFromUrl(courseVideo?.resource_video_url)}`}
                                        title={courseVideo?.name}
                                        frameBorder="0"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </Col>
                            <Col sm={3}><h3>Посилання:</h3></Col>
                            <Col sm={4}><textarea value={courseVideo?.resource_video_url} style={{ width: '100%' }}></textarea></Col>
                        </Row>
                    </>
                );
            })}

            <Row className="d-flex justify-content-center align-items-center justify-content-around mb-4">
                <Col sm={4}><h3 style={{ marginLeft: '9%' }}>Посилання на файли до курсу:</h3></Col>
                <Col sm={8}><textarea value={course?.resource_url} style={{ width: '100%' }}></textarea></Col>
            </Row>

        </Container>
    );
};

export default AuthorManage;