const express = require('express');
require('dotenv').config();
const connectDB = require('./config/dbConfig')();

const app = express();

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => res.send('API is up!'));

//* Router
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

app.listen(PORT, console.log(`Server is running on ${PORT}`));
