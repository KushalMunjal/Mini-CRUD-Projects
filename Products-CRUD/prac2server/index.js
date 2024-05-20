const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors'); 
require('express-async-errors');

const { sequelize } = require('./db');
const productRoutes = require('./controllers/prod_controller.js');

// Middleware
app.use(cors()); // Use cors middleware to enable CORS
app.use(bodyParser.json());
app.use('/api/products', productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send('Something went wrong!');
});

// Ensure the database connection is successful before starting the server
sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection succeeded.');
        app.listen(3000, () => {
            console.log('Server started at port 3000.');
        });
    })
    .catch(err => {
        console.log('Database connection failed.');
        console.error(err);
    });
