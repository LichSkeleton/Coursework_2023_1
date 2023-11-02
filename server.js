const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express()
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: 'coursework_2023_1'
})

app.get('/', (req, res)=> {
    return res.json("BACKEND HI)");
})

app.get('/courses', (req, res)=>{
    const { id } = req.query; // Get the 'id' query parameter

    if (id) {
        // If 'id' is provided, fetch a single course by ID
        const sql = `SELECT * FROM courses WHERE id = ${id}`;
        db.query(sql, (err, data)=> {
            if(err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error" });
            }
            return res.json(data[0]); // Assuming 'id' is unique, return the first result
        });
    } else {
        // If 'id' is not provided, fetch all courses
        const sql = "SELECT * FROM courses";
        db.query(sql, (err, data)=> {
            if(err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error" });
            }
            return res.json(data);
        });
    }
});

app.get('/coursesvideos', (req, res)=>{
    const { id } = req.query; // Get the 'id' query parameter

    if (id) {
        // If 'id' is provided, fetch a single coursesvideos by ID
        const sql = `SELECT * FROM courses_videos WHERE course_id = ${id}`;
        db.query(sql, (err, data)=> {
            if(err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error" });
            }
            return res.json(data);
        });
    }else return res.status(500).json({ error: "Data wasn't fetched" });
});

app.get('/authors', (req, res)=>{
    const { id } = req.query; // Get the 'id' query parameter

    if (id) {
        // If 'id' is provided, fetch a single author by ID
        const sql = `SELECT * FROM authors WHERE id = ${id}`;
        db.query(sql, (err, data)=> {
            if(err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error" });
            }
            return res.json(data[0]); // Assuming 'id' is unique, return the first result
        });
    } else {
        // If 'id' is not provided, fetch all authors
        const sql = "SELECT * FROM authors";
        db.query(sql, (err, data)=> {
            if(err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error" });
            }
            return res.json(data);
        });
    }
});


app.get('/categories', (req, res)=>{
    const sql = "SELECT * FROM categories";
    db.query(sql, (err,data)=> {
        if(err) {
            console.error(err); // Log the error to the server console
            return res.status(500).json({ error: "Internal server error" }); // Return an error response
        }
        return res.json(data);
    })
})

app.get('/courses_categories', (req, res)=>{
    const sql = "SELECT * FROM courses_categories";
    db.query(sql, (err,data)=> {
        if(err) {
            console.error(err); // Log the error to the server console
            return res.status(500).json({ error: "Internal server error" }); // Return an error response
        }
        return res.json(data);
    })
})

app.listen(8081, ()=> {
    console.log("listening");
})