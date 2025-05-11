
import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'


configDotenv();
const app = express();

// CORS (Cross-Origin Resource Sharing)
app.use(cors({
    origin: process.env.CORS_ORIGIN,  // e.g., 'http://localhost:3000' or 'https://myfrontend.com'
    allowedHeaders: ['Content-Type','Origin', 'Authorization'], // Allowed headers
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
}));

app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());

// routes import
import userRouter from './src/Routes/user.route.js'
import uiKitRouter from './src/Routes/uiKit.route.js'

// Routes

app.use('/api/users', userRouter);
// // http://localhost:8000/api/users/*

app.use('/api/uikit', uiKitRouter);
// // http://localhost:8000/api/uikit/*

// app.use('/api/cart', cartRouter);
// // http://localhost:8000/api/blogs/*

export { app };