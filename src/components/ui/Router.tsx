import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CourseMainPage from '../../page/courses/CourseMainPage';
import CourseSingle from '../../page/courses/CourseSingle';
import SignInPage from '../../page/SignIn/SignInPage';
import SignUpPage from '../../page/SignUp/SignUpPage';
import MainUsers from '../../page/users/mainUsers';
import MainAdmins from '../../page/users/mainAdmin';
import CreateCourse from '../../page/users/admin/Create/createCourse';
import CreatePackage from '../../page/users/admin/Create/createPackage';
import CreateAuthor from '../../page/users/admin/Create/createAuthor';
import CreateCategory from '../../page/users/admin/Create/createCategory';
import AboutUs from '../../page/AboutUs';
import { IRootState, useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProfile } from '../../store/auth/actionCreators';

const Router = () => {
    const isLoggedIn = useSelector(
        (state: IRootState) => !!state.auth.authData.accessToken
    );


    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CourseMainPage />} />
                <Route element={<CourseSingle />} path="/course/:id" />
                <Route element={<MainUsers />} path="/dashboard" />
                {/* <Route
                    path="/dashboard"
                    element={isLoggedIn ? <MainUsers /> : <Navigate to="/" />}
                /> */}
                <Route element={<CreateCourse />} path="/admin/createcourse/" />
                <Route element={<CreatePackage />} path="/admin/createpackage/" />
                <Route element={<CreateAuthor />} path="/admin/createauthor/" />
                <Route element={<CreateCategory />} path="/admin/createcategory/" />


                <Route path="/about" element={<AboutUs />} />
                <Route path="/admin" element={<MainAdmins />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path='*' element={<div className='d-flex flex-grow-1 justify-content-center m-5'><div className="row mb-6 justify-content-center m-5"><h1 className='m-5'>Not Found.</h1></div></div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router