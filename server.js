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
    const sql = "SELECT * FROM courses";
    db.query(sql, (err,data)=> {
        if(err) {
            console.error(err); // Log the error to the server console
            return res.status(500).json({ error: "Internal server error" }); // Return an error response
        }
        return res.json(data);
    })
})

app.get('/authors', (req, res)=>{
    const sql = "SELECT * FROM authors";
    db.query(sql, (err,data)=> {
        if(err) {
            console.error(err); // Log the error to the server console
            return res.status(500).json({ error: "Internal server error" }); // Return an error response
        }
        return res.json(data);
    })
})


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