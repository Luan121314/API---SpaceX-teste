import dotenv from 'dotenv';
if(process.env.NODE_ENV !== "PRODUCTION") dotenv.config();
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import routes  from './routes';
import errorHandler from './errors/handler'
import database from './services/database/connection';
import manifest from './manifest';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);
database();

const {port} = manifest.server;
app.listen(port, ()=>{
    console.log(`Server running in port ${port} `);
});

