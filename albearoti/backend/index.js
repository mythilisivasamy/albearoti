import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './database/connection.js';
import authRouter from './routes/authRoutes.js';
import blogRouter from './routes/blogRoutes.js';

// Initiate the Express Application
const app = express();
app.use(express.json());
app.use(cors());

//Configuring Process Environment Variables
dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT;

//connecting to Database
connectDB();

//parse request to body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/blog', blogRouter);

// Express Server Listening at the port
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
