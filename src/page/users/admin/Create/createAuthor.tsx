import React, { useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useTokenCheck from '../../../../components/ui/ProtectedRoute';

interface Author {
    fullname: string;
    photo_url: string;
}

const CreateAuthor: React.FC = () => {
    useTokenCheck();
    const navigate = useNavigate();

    const [author, setAuthor] = useState<Author>({
        fullname: '',
        photo_url: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAuthor({
            ...author,
            [name]: value,
        });

        if (name === 'photo_url') {
            if (value.length > 0) {
                // Update the background image of the div when the 'photo_url' field changes
                const imageAuthorDiv = document.getElementById('imageAuthor');
                if (imageAuthorDiv)
                    imageAuthorDiv.style.backgroundImage = `url(${value})`;
            } else {
                const imageAuthorDiv = document.getElementById('imageAuthor');
                if (imageAuthorDiv)
                    imageAuthorDiv.style.backgroundImage = `url(https://t3.ftcdn.net/jpg/02/35/35/40/360_F_235354051_yz3envzxnH9dulycguP6l4Bh3Xx0BPZ0.jpg)`;
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if all required fields are filled in
        if (author.fullname === '' || author.photo_url === '') {
            alert('Заповніть всі поля будь ласка');
            return;
        }
        // Check if the author name is less than 255 symbols
        if (author.fullname.length > 254) {
            alert('Повне ім\'я автора повино бути меньше 255 символів');
            return;
        }

        try {
            const [authorResponse] = await Promise.all([
              axios.post('http://localhost:8081/CreateAuthor', author),
            ]);
            navigate('/admin/', { replace: true });
          } catch (error: any) { // Specify 'error' as any type
            console.error('Error:', error);
          }

    };
    return (
        <>
            <div className='m-1'>
                <Link className="btn btn-secondary" to={{ pathname: `/admin/` }}>Назад</Link>
            </div>
            <div id="imageAuthor" className="m-auto border image-author-div" style={{
                backgroundImage: `url(https://t3.ftcdn.net/jpg/02/35/35/40/360_F_235354051_yz3envzxnH9dulycguP6l4Bh3Xx0BPZ0.jpg)`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                height: '180px',
                width: '180px',
            }} />
            <Form className='p-5' onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Повне ім'я автора:</Form.Label>
                    <Form.Control
                        type="text"
                        name="fullname"
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Посилання на фото:</Form.Label>
                    <Form.Control
                        type="text"
                        name="photo_url"
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className='float-end'>
                    Створити Автора
                </Button>
            </Form>
        </>
    );
};
export default CreateAuthor;
