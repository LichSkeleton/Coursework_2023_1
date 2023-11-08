import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthorsServise, CategoriesServise } from '../../../../services/server_conn';
import axios from 'axios';
import useTokenCheck from '../../../../components/ui/ProtectedRoute';

interface Category {
    name: string;
}

const CreateCategory: React.FC = () => {
    useTokenCheck();
    const navigate = useNavigate();

    const [category, setCategory] = useState<Category>({
        name: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCategory({
            ...category,
            [name]: value,
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if all required fields are filled in
        if (category.name === '') {
            alert('Please fill in all fields');
            return;
        }
        // Check if the author name is less than 255 symbols
        if (category.name.length > 49) {
            alert('Course name must be less than 50 symbols');
            return;
        }

        try {
            const [authorResponse] = await Promise.all([
                axios.post('http://localhost:8081/CreateCategory', category),
            ]);
            console.log(authorResponse);
            navigate('/admin/', { replace: true });
        } catch (error: any) { // Specify 'error' as any type
            console.error('Error:', error);
            if (axios.isAxiosError(error) && error.response && error.response.status === 400) {
                // Handle the 400 Bad Request error (duplicate entry)
                alert('A category with the same name already exists.');
            }
        }

    };

    // Function to handle author selection

    return (
        <>
            <div className='m-1'>
                <Link className="btn btn-secondary" to={{ pathname: `/admin/` }}>Назад</Link>
            </div>
            <Form className='m-5 p-5' onSubmit={handleSubmit}>
                <Form.Group controlId="authorSelect">
                    <Form.Label>Category name:</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className='float-end mt-4'>
                    Create Category
                </Button>
            </Form>
        </>
    );
};
export default CreateCategory;
