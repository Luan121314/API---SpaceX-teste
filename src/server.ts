import express from 'express';
import dotenv  from 'dotenv';
import 'express-async-errors';

if(process.env.NODE_ENV != "PRODUCTION"){
    dotenv.config()
    console.log('Enviroment variable loading');
}
import cors from 'cors';
import '../src/services/database/connection';
import routes  from './routes';
import errorHandler from '../src/errors/handler'

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes)
app.use(errorHandler)

const port = process.env.PORT || 3333;

app.listen(port, ()=>{
    console.log(`Running server in port ${port}`);
});