import React, { useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
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
            alert('Заповінть всі поля будь ласка');
            return;
        }
        // Check if the package name is less than 255 symbols
        if (mypackage.price <=0 || mypackage.months_available <= 0) {
            alert('Ціна та кількість міцяців не повині бути меньше або дорівнювати 0');
            return;
        }
        if (typeof mypackage.price !== 'number' || !Number.isFinite(mypackage.price) || !Number.isInteger(mypackage.price)) {
            alert('Ціна повина бути дійсним числом');
            return;
        }
        
        if (typeof mypackage.months_available !== 'number' || !Number.isInteger(mypackage.months_available)) {
            alert('Кількість місяців має бути числом');
            return;
        }

        // Check if the package name is less than 255 symbols
        if (mypackage.name.length > 254) {
            alert('Ім\'я пакету повинно бути меньше 255 символів');
            return;
        }

        try {
            const [mypackageResponse] = await Promise.all([
              axios.post('http://localhost:8081/CreatePackage', mypackage),
            ]);
            navigate('/admin/', { replace: true });
          } catch (error: any) { // Specify 'error' as any type
            console.error('Error:', error);
            if (axios.isAxiosError(error) && error.response && error.response.status === 400) {
              // Handle the 400 Bad Request error (duplicate entry)
              alert('Пакет з таким ім\'ям вже існує');
            }
          }

    };
    return (
        <>
            <div className='m-1'>
                <Link className="btn btn-secondary" to={{ pathname: `/admin/` }}>Назад</Link>
            </div>
            <Form className='p-5' onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Ім'я пакету:</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ціна:</Form.Label>
                    <Form.Control
                        type="text"
                        name="price"
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Кількість місяців доступу:</Form.Label>
                    <Form.Control
                        type="text"
                        name="months_available"
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className='float-end'>
                    Створити пакет
                </Button>
            </Form>
        </>
    );
};

export default CreatePackage;
