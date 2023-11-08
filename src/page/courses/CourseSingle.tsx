import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthorsServise, CoursesServise, CoursesVideosServise } from '../../services/server_conn';
import { Card, Col, Container } from 'react-bootstrap';
import CourseVideoTab from './CourseVideoTab'; 
import AuthServise from '../../components/ui/AuthServise';

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
  resource_video_url: string;
}

interface Author {
  id: number;
  fullname: string;
  photo_url: string;
}

const CourseSingle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourses] = useState<Course>();
  const [author, setAuthor] = useState<Author>();
  const [courseVideos, setCourseVideos] = useState<CourseVideos[]>([]);
  const [user,setUser] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUser(AuthServise.getActivePackage(AuthServise.getJwtToken()));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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

  if (!course?.name) return <div style={{ width: '100%', textAlign: 'center' }}><h1>Загрузка....</h1></div>;

  if(user===null && course?.is_free == false){
     navigate('/', { replace: true });
  };

  return (
    <Container className='border p-3'>
      <div className="d-flex flex-row align-items-center justify-content-center m-5 row">
        <Col md={12} lg={6} className="d-flex justify-content-center align-items-center">
          <Card.Img src={course?.icon_url} alt={course?.name} style={{ height: '300px', width: '500px' }} />
        </Col>
        <Col md={12} lg={6} className="d-flex flex-column justify-content-center align-items-center">
          <h2 className='float-center'>Автор:</h2>
          <div style={{
            backgroundImage: `url(${author?.photo_url})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            height: '250px',
            width: '250px',
          }} />
          <div className='float-center'>{author?.fullname}</div>
        </Col>
      </div>
      <Card>
        <Card.Body>
          <Card.Title>{course?.name}</Card.Title>
          <Card.Text>{course?.description}</Card.Text>
          <CourseVideoTab courseVideos={courseVideos || []} />
          <a href={course?.resource_url} className='btn btn-primary text-end' target="_blank">Download Files</a>
        </Card.Body>
      </Card>
    </Container >
  );
};

export default CourseSingle;