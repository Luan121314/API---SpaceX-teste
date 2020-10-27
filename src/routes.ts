import { Router } from 'express';
import Users from './controllers/UsersControllers';
import News from './controllers/NewsControllers';

const route = Router();
const users = new Users;

route.get('/users', users.index);
route.get('/users/:id', users.show);
route.post('/users', users.create);
route.put('/users/:id', users.update);
route.delete('/users/:id', users.delete);


const news = new News;

route.get('/news', news.index);
route.get('/news/:id', news.show);
route.post('/news', news.create);
route.put('/news/:id', news.update);
route.delete('/news/:id', news.delete);

export default route;