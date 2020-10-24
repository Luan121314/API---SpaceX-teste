import { Router } from 'express';
import Users from './controllers/Users-controllers'

const route = Router();
const users = new Users;

route.get('/users', users.index);
route.get('/users/:id', users.show);
route.post('/users', users.create);
route.put('/users/:id', users.update);
route.delete('/users/:id', users.delete);

export default route;