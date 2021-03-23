import express from 'express';
import 'express-async-errors';
import routes  from './routes';
import cors from 'cors';
import errorHandler from './errors/handler'
import database from './services/database/connection';
import dotenv from 'dotenv';

if(process.env.NODE_ENV !== "PRODUCTION") dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);
database();

const port = process.env.PORT || 3333;
app.listen(port, ()=>{
    console.log(`Server running in port ${port} `);
});

