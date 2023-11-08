import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CourseMainPage from '../../page/courses/CourseMainPage';
import CourseSingle from '../../page/courses/CourseSingle';
import SignInPage from '../../page/SignIn/SignInPage';
import SignUpPage from '../../page/SignUp/SignUpPage';
import MainUsers from '../../page/users/mainUsers';
import MainAdmins from '../../page/users/mainAdmin';
import CourseManage from '../../page/users/admin/courseManage';
import CreateCourse from '../../page/users/admin/Create/createCourse';
import CreatePackage from '../../page/users/admin/Create/createPackage';
import CreateAuthor from '../../page/users/admin/Create/createAuthor';
import CreateCategory from '../../page/users/admin/Create/createCategory';
import { useEffect, useState } from 'react';
import AuthService from './AuthServise';
import AboutUs from '../../page/About';

const Router = () => {
    const [jwtToken, setJwtToken] = useState<string | null>(null);
    
    useEffect(() => {
        const token = AuthService.getJwtToken();
        setJwtToken(token);
    }, []);

    const userRole = AuthService.getJwtTokenRole(jwtToken);

    return (
            <Routes>
                <Route path="/" element={<CourseMainPage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route element={<CourseSingle />} path="/course/:id" />

                {userRole ? (
                    <>
                        <Route element={<CreateCourse />} path="/admin/createcourse/" />
                        <Route element={<CreatePackage />} path="/admin/createpackage/" />
                        <Route element={<CreateAuthor />} path="/admin/createauthor/" />
                        <Route element={<CreateCategory />} path="/admin/createcategory/" />
                        <Route path="/admin" element={<MainAdmins />} />
                    </>
                ) : (
                    <Route path="/dashboard" element={<MainUsers />} />
                )}

                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path='*' element={<div className='d-flex flex-grow-1 justify-content-center m-5'><div className="row mb-6 justify-content-center m-5"><h1 className='m-5'>Not Found.</h1></div></div>} />
            </Routes>
    );
}

export default Router