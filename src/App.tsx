import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header';
import Footer from './components/Footer';
import CoursePage from './page/courses/CourseMainPage'
// import './App.css';

function App() {
    // Placeholder data (replace with actual API requests)
    const [courses, setCourses] = useState([
      {
        id: 1,
        author: 'Author 1',
        name: 'Course 1',
        categories: ['Category 1', 'Category 2'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        icon_url: 'https://www.keycdn.com/img/support/javascript.png',
        is_free: true,
      },
      {
        id: 2,
        author: 'Author 2',
        name: 'Course 2',
        categories: ['Category 2', 'Category 3'],
        description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
        icon_url: 'https://pimylifeup.com/wp-content/uploads/2022/08/PHP-GET.jpg',
        is_free: false,
      },
      {
        id: 3,
        author: 'Peter Parker',
        name: 'Building a Web App with React and TypeScript',
        categories: ['JavaScript', 'TypeScript', 'Web Development'],
        description: 'This course will teach you how to build a full-fledged web app using React and TypeScript.',
        icon_url: 'https://pimylifeup.com/wp-content/uploads/2022/08/PHP-GET.jpg',
        is_free: false,
      },
  ]);
  return (
    <div className="App">
      <Header />
      {/* <CoursePage courses={courses} /> */}
      <CoursePage />
      <Footer />
    </div>
  );
}

export default App;
