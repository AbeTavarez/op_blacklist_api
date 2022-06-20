const express = require('express');
require('dotenv').config();
const connectDB = require('./config/dbConfig')();

const app = express();

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => res.send('API is up!'));

app.listen(PORT, console.log(`Server is running on ${PORT}`));
