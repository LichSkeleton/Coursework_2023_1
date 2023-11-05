import axios from 'axios';

export const CoursesServise = {
    async getAll() {
        const response = await axios.get('http://localhost:8081/courses')
        return response.data;
    },
    async getById(id){
        const response = await axios.get(`http://localhost:8081/courses?id=${id}`)
        return response.data;
    }
};

export const CoursesVideosServise = {
    async getAllById(id){
        const response = await axios.get(`http://localhost:8081/coursesvideos?id=${id}`)
        return response.data;
    }
};


export const AuthorsServise = {
    async getAll() {
        const response = await axios.get('http://localhost:8081/authors')
        return response.data;
    },
    async getById(id){
        const response = await axios.get(`http://localhost:8081/authors?id=${id}`)
        return response.data;
    }
};


export const CategoriesServise = {
    async getAll() {
        const response = await axios.get('http://localhost:8081/categories')
        return response.data;
    }
};

export const CoursesCategoriesServise = {
    async getAll() {
        const response = await axios.get('http://localhost:8081/courses_categories')
        return response.data;
    }
};

export const PackagesServise = {
    async getAll() {
        const response = await axios.get('http://localhost:8081/packages')
        return response.data;
    },
    async getById(id){
        const response = await axios.get(`http://localhost:8081/packages?id=${id}`)
        return response.data;
    }
};