import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbConfig';
import morgan from 'morgan';
import cors from 'cors'
dotenv.config()
connectDB()
const app: Express = express();

const PORT = process.env.PORT || 4000;

//* Middleware
app.use(express.json());
app.use(morgan('dev'))
app.use(cors())

app.get('/', (req: Request, res: Response) => res.send('API is up!'));

//* Router
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
});
