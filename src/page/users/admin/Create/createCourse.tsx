import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthorsServise, CategoriesServise } from '../../../../services/server_conn';
import axios from 'axios';
import useTokenCheck from '../../../../components/ui/ProtectedRoute';

interface Course {
    author_id: number;
    name: string;
    description: string;
    icon_url: string;
    resource_url: string;
    is_free: boolean;
}

interface Category {
    id: number;
    name: string;
}

interface Author {
    id: number;
    fullname: string;
    photo_url: string;
}

interface CourseVideo {
    name: string;
    resource_video_url: string;
}

const CreateCourse: React.FC = () => {
    useTokenCheck();
    const navigate = useNavigate();

    const [course, setCourse] = useState<Course>({
        author_id: 0,
        name: '',
        description: '',
        icon_url: '',
        resource_url: '',
        is_free: false,
    });

    const [authors, setAuthors] = useState<Author[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [courseVideos, setCourseVideos] = useState<CourseVideo[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const dataAuthors = await AuthorsServise.getAll();
                setAuthors(dataAuthors);
                // Set the initial selected author ID to the first author in the list
                if (dataAuthors.length > 0) {
                    setCourse({
                        ...course,
                        author_id: dataAuthors[0].id,
                    });
                }
                const dataCategories = await CategoriesServise.getAll();
                setCategories(dataCategories);

                handleAddCourseVideo();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value} = e.target;

        if (name === 'author_id') {
            setCourse({
                ...course,
                [name]: parseInt(value, 10),
            });
        } else if (name === 'is_free' && e.target instanceof HTMLInputElement) {
            setCourse({
                ...course,
                [name]: e.target.checked, // Treat 'is_free' as a boolean
            });
        } else {
            setCourse({
                ...course,
                [name]: value,
            });
        }
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const categoryId = parseInt(e.target.value, 10);
    
        if (e.target.checked) {
            setSelectedCategories((prevCategories) => [...prevCategories, categoryId]);
        } else {
            setSelectedCategories((prevCategories) =>
                prevCategories.filter((id) => id !== categoryId)
            );
        }
    };

    const handleAddCourseVideo = async () => {
        try {
            // Create a new video with the next available course ID
            const newVideo: CourseVideo = {
                name: '',
                resource_video_url: '',
            };

            setCourseVideos([...courseVideos, newVideo]);
        } catch (error) {
            console.error('Error getting the next course ID:', error);
        }
    };

    const handleCourseVideoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, index: number) => {
        const { name, value } = e.target;

        const updatedVideos = [...courseVideos];
        updatedVideos[index] = {
            ...updatedVideos[index],
            [name]: value,
        };

        setCourseVideos(updatedVideos);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if all required fields are filled in
        if (course.name === '' || course.description === '' || course.icon_url === '' || course.resource_url === '') {
            alert('Please fill in all fields');
            return;
        }
        const hasInvalidCourseVideo = courseVideos.some(video => !video.name || !video.resource_video_url);
        if (hasInvalidCourseVideo) {
            alert('Please fill in all course video fields');
            return;
        }
        // Check if the course name is less than 255 symbols
        if (course.name.length > 254) {
            alert('Course name must be less than 255 symbols');
            return;
        }
        // Check if at least one category is selected
        if (!selectedCategories || selectedCategories.length === 0) {
            alert('Please select at least one category');
            return;
        }

        // console.log('New course data:', course);
        // console.log('Course videos:', courseVideos);

        const data = {
            course: course,         // Your course object
            courseVideos: courseVideos  // Your array of course videos
        };
        try {
            const [courseResponse, categoriesResponse] = await Promise.all([
                axios.post('http://localhost:8081/createCourse', data),
                axios.post('http://localhost:8081/CoursesCategories', { selectedCategories }),
            ]);
    
            navigate('/admin/', { replace: true });
        } catch (error) {
            console.error('Error:', error);
        }
    
    };

    // Function to handle author selection

    return (
        <>
            <div className='m-1'>
                <Link className="btn btn-secondary" to={{ pathname: `/admin/` }}>Назад</Link>
            </div>
            <Form className='p-5' onSubmit={handleSubmit}>
                <Form.Group controlId="authorSelect">
                    <Form.Label>Author name:</Form.Label>
                    <Form.Select
                        className="custom-select"
                        name='author_id'
                        onChange={handleInputChange}
                    >
                        {authors.map((author) => (
                            <option key={author.id} value={author.id}>
                                {author.fullname}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Course Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Icon URL</Form.Label>
                    <Form.Control
                        type="text"
                        name="icon_url"
                        onChange={handleInputChange}
                    />
                </Form.Group>

                {categories.length > 0 && (
                    <Form.Group className="mb-3">
                        <Form.Label>Categories:</Form.Label>
                        {categories.map((category) => (
                            <Form.Check
                                key={category.id}
                                type="checkbox"
                                label={category?.name}
                                name="selectedCategories"
                                value={category.id.toString()}
                                onChange={handleCategoryChange}
                            />
                        ))}
                    </Form.Group>
                )}

                {/* <Form.Group className="mb-3"> */}
                {courseVideos.map((video, index) => (
                    <div>
                        <Form.Group className="mb-3">
                            <Form.Label>Video {index + 1} Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                onChange={(e) => handleCourseVideoChange(e, index)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Video {index + 1} URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="resource_video_url"
                                onChange={(e) => handleCourseVideoChange(e, index)}
                            />
                        </Form.Group>
                    </div>
                ))}
                {/* </Form.Group> */}

                <div className='mb-5'>
                    <Button onClick={handleAddCourseVideo} className="float-end">Add More Videos</Button>
                </div>

                <Form.Group className="mb-3">
                    <Form.Label>Resource URL</Form.Label>
                    <Form.Control
                        type="text"
                        name="resource_url"
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check
                        type="checkbox"
                        label="Is Free"
                        name="is_free"
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className='float-end'>
                    Create Course
                </Button>
            </Form>
        </>
    );
};

export default CreateCourse;
