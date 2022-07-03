import express from "express";
import morgan from "morgan";
import cors from "cors";
import register from './routes/register';
import login from './routes/login';
import forgetPassword from './routes/forgetPassword';
import './database'
require('dotenv').config();

const app = express()

// middLewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
const options = { origin: process.env.ORIGIN, }
app.use(cors(options))

// routes
app.use(register);
app.use(login);
app.use(forgetPassword);

export default app