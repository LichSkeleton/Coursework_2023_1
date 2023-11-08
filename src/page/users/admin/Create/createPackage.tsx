import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthorsServise, CategoriesServise } from '../../../../services/server_conn';
import axios from 'axios';
import useTokenCheck from '../../../../components/ui/ProtectedRoute';

interface Package {
    name: string;
    price: number;
    months_available: number;
}

const CreatePackage: React.FC = () => {
    useTokenCheck();
    const navigate = useNavigate();

    const [mypackage, setMyPackage] = useState<Package>({
        name: '',
        price: 0,
        months_available: 0,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'price') {
            setMyPackage({
                ...mypackage,
                [name]: parseFloat(value),
            });
        }else if (name === 'months_available') {
            setMyPackage({
                ...mypackage,
                [name]: parseInt(value, 10),
            });
        } else {
            setMyPackage({
                ...mypackage,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if all required fields are filled in
        if (mypackage.name === '' || mypackage.price.toString() === '' || mypackage.months_available.toString() === '') {
            alert('Please fill in all fields');
            return;
        }
        // Check if the package name is less than 255 symbols
        if (mypackage.price <0 || mypackage.months_available < 0) {
            alert('mypackage.price <0 || mypackage.months_available < 0 - it`s not good!');
            return;
        }
        if (typeof mypackage.price !== 'number' || !Number.isFinite(mypackage.price) || !Number.isInteger(mypackage.price)) {
            alert('mypackage.price is not a float');
            return;
        }
        
        if (typeof mypackage.months_available !== 'number' || !Number.isInteger(mypackage.months_available)) {
            alert('mypackage.months_available is not an integer');
            return;
        }

        // Check if the package name is less than 255 symbols
        if (mypackage.name.length > 254) {
            alert('Course name must be less than 255 symbols');
            return;
        }

        try {
            const [mypackageResponse] = await Promise.all([
              axios.post('http://localhost:8081/CreatePackage', mypackage),
            ]);
            // console.log(mypackageResponse);
            navigate('/admin/', { replace: true });
          } catch (error: any) { // Specify 'error' as any type
            console.error('Error:', error);
            if (axios.isAxiosError(error) && error.response && error.response.status === 400) {
              // Handle the 400 Bad Request error (duplicate entry)
              alert('A package with the same name already exists.');
            }
          }

    };

    // Function to handle author selection

    return (
        <>
            <div className='m-1'>
                <Link className="btn btn-secondary" to={{ pathname: `/admin/` }}>Назад</Link>
            </div>
            <Form className='p-5' onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Package name:</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Price:</Form.Label>
                    <Form.Control
                        type="text"
                        name="price"
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>months_available:</Form.Label>
                    <Form.Control
                        type="text"
                        name="months_available"
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className='float-end'>
                    Create Package
                </Button>
            </Form>
        </>
    );
};

export default CreatePackage;
