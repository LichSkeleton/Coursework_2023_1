const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
// Secret key for JWT (replace with your own secret key)
const secretKey = 'abcr';
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: 'coursework_2023_1'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to the database with ID ' + db.threadId);
});

app.get('/', (req, res) => {
    return res.json("BACKEND HI)");
});

app.post('/register', (req, res) => {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
        // Check if any required fields are missing
        res.status(400).json({ error: 'Please provide fullname, email, and password' });
        return;
    }

    // Check if the email is already in use
    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
        } else if (results.length > 0) {
            // Email is already in use
            res.status(400).json({ error: 'Email is already in use' });
        } else {
            // Hash the password before storing it in the database
            bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
                if (hashErr) {
                    console.error(hashErr);
                    res.status(500).json({ error: 'Password hashing error' });
                } else {
                    // Insert the new user into the database
                    const insertUserQuery = 'INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)';
                    db.query(insertUserQuery, [fullname, email, hashedPassword], (insertErr) => {
                        if (insertErr) {
                            console.error(insertErr);
                            res.status(500).json({ error: 'Database error' });
                        } else {
                            res.status(200).json({ message: 'Registration successful' });
                        }
                    });
                }
            });
        }
    });
});

app.post('/purchase-package', async (req, res) => {
    try {
        // Extract the email and id_package from the request body
        const { email, id_package } = req.body;

        // Retrieve the package details including months_available
        const getPackageQuery = 'SELECT id, months_available FROM packages WHERE id = ?';
        db.query(getPackageQuery, [id_package], (error, packageResults) => {
            if (error) {
                return error;
            }

            if (packageResults.length === 0) {
                res.status(404).json({ message: 'Package not found' });
                return;
            }

            const package = packageResults[0];

            // Calculate the end_date by adding months_available to the current date
            const currentDate = new Date();
            currentDate.setMonth(currentDate.getMonth() + package.months_available);

            // Update the user's active_package_id and end_date
            const updateUserQuery = 'UPDATE users SET active_package_id = ?, end_date = ? WHERE email = ?';
            db.query(updateUserQuery, [id_package, currentDate, email], (updateError) => {
                if (updateError) {
                    throw updateError;
                }

                // Generate a new JWT token with the updated claims
                const payload = {
                    email: email,
                    active_package_id: id_package, // Include active_package_id in the JWT payload
                };

                const newAccessToken = jwt.sign(payload, secretKey, { expiresIn: '40m' });

                // Send the new JWT token as a response
                res.status(200).json({
                    message: 'Package purchased successfully',
                    accessToken: newAccessToken,
                });
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error purchasing package' });
    }
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Query the database to check if there is a user with the provided email
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            // Handle database error
            console.error(err);
            res.status(500).json({ error: 'Database error' });
        } else if (results.length > 0) {
            const user = results[0]; // Assuming the query returns a single user

            // Use bcrypt to compare the provided password with the hashed password in the database
            bcrypt.compare(password, user.password, (bcryptErr, passwordMatch) => {
                if (bcryptErr) {
                    console.error(bcryptErr);
                    res.status(500).json({ error: 'Password comparison error' });
                } else if (passwordMatch) {
                    // Passwords match, create JWT token
                    // Check if end_date is less than the current date
                    const currentDate = new Date();
                    const endDate = new Date(user.end_date);

                    if (endDate < currentDate) {
                        // If end_date is in the past, reset active_package_id and end_date to null
                        db.query('UPDATE users SET active_package_id = NULL, end_date = NULL WHERE id = ?', [user.id], (updateErr) => {
                            if (updateErr) {
                                console.error(updateErr);
                                res.status(500).json({ error: 'Database error' });
                            }
                        });
                    }
                    
                    if(user.end_date && !user.active_package_id){
                        db.query('UPDATE users SET end_date = NULL WHERE id = ?', [user.id], (updateErr) => {
                            if (updateErr) {
                                console.error(updateErr);
                                res.status(500).json({ error: 'Database error' });
                            }
                        });
                    }
                    if(user.admin){
                        user.active_package_id = 1;
                    }

                    // Include active_package_id in the JWT payload
                    const payload = {
                        email: user.email,
                        role: user.admin,
                        active_package_id: user.active_package_id, // Add this line
                    };

                    // Create a JWT token with the payload
                    const accessToken = jwt.sign(payload, secretKey, { expiresIn: '40m' });

                    // Return the token to the client
                    res.json({ accessToken });
                } else {
                    // Authentication failed
                    res.status(401).json({ error: 'Authentication failed' });
                }
            });
        } else {
            // User not found
            res.status(401).json({ error: 'User not found' });
        }
    });
});



app.get('/users', (req, res) => {
    const { email } = req.query; // Get the 'email' query parameter

    if (email) {
        // Use a parameterized query to avoid SQL injection
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.query(sql, [email], (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error" });
            }
            return res.json(data);
        });
    } else {
        return res.status(400).json({ error: "Email parameter is required" });
    }
});

app.get('/courses', (req, res) => {
    const { id } = req.query; // Get the 'id' query parameter

    if (id) {
        // If 'id' is provided, fetch a single course by ID
        const sql = `SELECT * FROM courses WHERE id = ${id}`;
        db.query(sql, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error" });
            }
            return res.json(data[0]); // Assuming 'id' is unique, return the first result
        });
    } else {
        // If 'id' is not provided, fetch all courses
        const sql = "SELECT * FROM courses ORDER BY id DESC";
        db.query(sql, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error" });
            }
            return res.json(data);
        });
    }
});

app.get('/coursesvideos', (req, res) => {
    const { id } = req.query; // Get the 'id' query parameter

    if (id) {
        // If 'id' is provided, fetch a single coursesvideos by ID
        const sql = `SELECT * FROM courses_videos WHERE course_id = ${id}`;
        db.query(sql, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error" });
            }
            return res.json(data);
        });
    } else return res.status(500).json({ error: "Data wasn't fetched" });
});

app.get('/authors', (req, res) => {
    const { id } = req.query; // Get the 'id' query parameter

    if (id) {
        // If 'id' is provided, fetch a single author by ID
        const sql = `SELECT * FROM authors WHERE id = ${id}`;
        db.query(sql, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error" });
            }
            return res.json(data[0]); // Assuming 'id' is unique, return the first result
        });
    } else {
        // If 'id' is not provided, fetch all authors
        const sql = "SELECT * FROM authors ORDER BY id DESC";
        db.query(sql, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error" });
            }
            return res.json(data);
        });
    }
});

app.get('/packages', (req, res) => {
    const { id } = req.query; // Get the 'id' query parameter

    if (id) {
        // If 'id' is provided, fetch a single author by ID
        const sql = `SELECT * FROM packages WHERE id = ${id}`;
        db.query(sql, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error" });
            }
            return res.json(data[0]); // Assuming 'id' is unique, return the first result
        });
    } else {
        // If 'id' is not provided, fetch all authors
        const sql = "SELECT * FROM packages ORDER BY id DESC";
        db.query(sql, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error" });
            }
            return res.json(data);
        });
    }
});


app.get('/categories', (req, res) => {
    const sql = "SELECT * FROM categories ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) {
            console.error(err); // Log the error to the server console
            return res.status(500).json({ error: "Internal server error" }); // Return an error response
        }
        return res.json(data);
    })
})

app.get('/courses_categories', (req, res) => {
    const sql = "SELECT * FROM courses_categories";
    db.query(sql, (err, data) => {
        if (err) {
            console.error(err); // Log the error to the server console
            return res.status(500).json({ error: "Internal server error" }); // Return an error response
        }
        return res.json(data);
    })
})

app.post('/createCourse', async (req, res) => {
    const { course, courseVideos } = req.body;

    if (!course || !courseVideos) {
        return res.status(400).json({ error: "Missing course or courseVideos data" });
    }

    // Check if the course name already exists
    const existingCourse = await db.query('SELECT * FROM courses WHERE name = ?', [course.name]);
    if (existingCourse.length > 0) {
        return res.status(400).json({ error: "Course name already exists" });
    }

    // Continue with course creation if the name is unique
    db.query('INSERT INTO courses (author_id, name, description, icon_url, resource_url, is_free) VALUES (?, ?, ?, ?, ?, ?)', [course.author_id, course.name, course.description, course.icon_url, course.resource_url, course.is_free], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }

        // Retrieve the auto-generated ID of the newly inserted course
        const courseId = result.insertId;

        // Add the courseId to each course video
        const courseVideosWithIds = courseVideos.map(video => ({
            ...video,
            course_id: courseId,
        }));

        // Insert the course videos into the 'courses_videos' table
        db.query('INSERT INTO courses_videos (course_id, name, resource_video_url) VALUES ?', [courseVideosWithIds.map(video => [video.course_id, video.name, video.resource_video_url])], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error" });
            }

            return res.status(200).json({ message: "Course and Course Videos created successfully" });
        });
    });
});


app.get('/getLastCourseId', (req, res) => {
    // Query the database to get the last course ID
    const sql = 'SELECT id FROM courses ORDER BY id DESC LIMIT 1';
    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        // Calculate the next available ID
        const nextId = data.length === 0 ? 1 : data[0].id + 1;
        return res.json({ nextId });
    });
});

app.post('/CoursesCategories', (req, res) => {
    const { selectedCategories } = req.body;

    // Check if selectedCategories is an array
    if (!Array.isArray(selectedCategories) || selectedCategories.length === 0) {
        return res.status(400).json({ error: "Invalid or empty selectedCategories array" });
    }

    // Get the last inserted course ID from the 'courses' table
    db.query('SELECT LAST_INSERT_ID() as last_id', (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }

        const lastCourseId = result[0].last_id;

        // Create an array of values to be inserted into 'courses_categories' table
        const values = selectedCategories.map(category_id => [lastCourseId, category_id]);

        // Insert the associations into the 'courses_categories' table
        db.query('INSERT INTO courses_categories (course_id, category_id) VALUES ?', [values], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error" });
            }

            return res.status(200).json({ message: "Categories associated with the course successfully" });
        });
    });
});

app.post('/CreatePackage', (req, res) => {
    const package = req.body; // Assuming the data from the request body contains 'name', 'price', and 'months_available'

    // Perform SQL query to insert the package data
    const insertQuery = 'INSERT INTO packages (name, price, months_available) VALUES (?, ?, ?)';
    db.query(insertQuery, [package.name, package.price, package.months_available], (error, results) => {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                // Handle duplicate entry error
                console.error('Duplicate entry: a package with the same name already exists.');
                return res.status(400).json({ error: 'A package with the same name already exists.' });
            } else {
                // Handle other errors
                console.error('Error inserting package: ' + error);
                return res.status(500).json({ error: 'Failed to create package' });
            }
        } else {
            console.log('Package inserted successfully');
            return res.status(200).json({ message: 'Package created successfully' });
        }
    });
});

app.post('/CreateAuthor', async (req, res) => {
    const author = req.body;

    const insertAuthorQuery = 'INSERT INTO authors (fullname, photo_url) VALUES (?, ?)';
    db.query(insertAuthorQuery, [author.fullname, author.photo_url], (error, results) => {
        if (error) {
            console.error('Error inserting author: ' + error);
            return res.status(500).json({ error: 'Failed to create author' });
        } else {
            console.log('Author inserted successfully');
            return res.status(200).json({ message: 'Author created successfully' });
        }
    });
});

app.post('/CreateCategory', async (req, res) => {
    const category = req.body;

    const insertAuthorQuery = 'INSERT INTO categories (name) VALUES (?)';
    db.query(insertAuthorQuery, [category.name], (error, results) => {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                // Handle duplicate entry error
                console.error('Duplicate entry: a category with the same name already exists.');
                return res.status(400).json({ error: 'A category with the same name already exists.' });
            } else {
                // Handle other errors
                console.error('Error inserting category: ' + error);
                return res.status(500).json({ error: 'Failed to create category' });
            }
        } else {
            console.log('Category inserted successfully');
            return res.status(200).json({ message: 'Category created successfully' });
        }
    });
});

app.delete('/deleteCourse/:id', async (req, res) => {
    const courseId = req.params.id;

    const delCourseQuery = 'DELETE FROM courses WHERE id = ?';
    db.query(delCourseQuery, [courseId], (error, results) => {
        if (error) {
            console.error('Error deleting course: ' + error);
            return res.status(500).json({ error: 'Failed to delete course' });
        } else {
            console.log('Deleted successfully');
            return res.status(200).json({ message: 'Delete was successfully completed.' });
        }
    });
});

app.delete('/deletePackage/:id', async (req, res) => {
    const packageId = req.params.id;

    const delCourseQuery = 'DELETE FROM packages WHERE id = ?';
    db.query(delCourseQuery, [packageId], (error, results) => {
        if (error) {
            console.error('Error deleting package: ' + error);
            return res.status(500).json({ error: 'Failed to delete package' });
        } else {
            console.log('Deleted successfully');
            return res.status(200).json({ message: 'Delete was successfully completed.' });
        }
    });
});

app.delete('/deleteAuthor/:id', async (req, res) => {
    const authorId = req.params.id;

    const delCourseQuery = 'DELETE FROM authors WHERE id = ?';
    db.query(delCourseQuery, [authorId], (error, results) => {
        if (error) {
            console.error('Error deleting author: ' + error);
            return res.status(500).json({ error: 'Failed to delete author' });
        } else {
            console.log('Deleted successfully');
            return res.status(200).json({ message: 'Delete was successfully completed.' });
        }
    });
});

app.delete('/deleteCategory/:id', async (req, res) => {
    const categoryId = req.params.id;

    const delCourseQuery = 'DELETE FROM categories WHERE id = ?';
    db.query(delCourseQuery, [categoryId], (error, results) => {
        if (error) {
            console.error('Error deleting category: ' + error);
            return res.status(500).json({ error: 'Failed to delete category' });
        } else {
            console.log('Deleted successfully');
            return res.status(200).json({ message: 'Delete was successfully completed.' });
        }
    });
});


app.listen(8081, () => {
    console.log("listening");
})