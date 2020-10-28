import express from 'express';
import 'express-async-errors';
import routes  from './routes';
import cors from 'cors';
import dotenv  from 'dotenv';
import errorHandler from './errors/handler'
import database from './services/database/connection';

if(process.env.NODE_ENV != "PRODUCTION"){
    dotenv.config()
    console.log('Enviroment variable loading');
}

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
database();
app.use(errorHandler);


const port = process.env.PORT || 3333;

app.listen(port, ()=>{
    console.log(`Running server in port ${port}`);
});