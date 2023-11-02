import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CourseMainPage from '../../page/courses/CourseMainPage';
import CourseSingle from '../../page/courses/CourseSingle';
import SignInPage from '../../page/SignIn/SignInPage';
import SignUpPage from '../../page/SignUp/SignUpPage';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CourseMainPage />} />
                <Route element={<CourseSingle />} path="/course/:id"/>
                {/* <Route path="/course/:id" element={<CourseSingle />} /> */}
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path='*' element={<div>Not found</div>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router