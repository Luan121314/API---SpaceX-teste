import { Router } from 'express';
import User from './controllers/UserController';
import Notice from './controllers/NoticeController';

const route = Router();
const user = new User;

route.get('/users', user.index);
route.get('/users/:id', user.show);
route.post('/users', user.create);
route.put('/users/:id', user.update);
route.delete('/users/:id', user.delete);



const notice = new Notice;

route.get('/notices', notice.index);
route.get('/notices/:id', notice.show);
route.post('/notices', notice.create);
route.put('/notices/:id', notice.update);
route.delete('/notices/:id', notice.delete);

export default route;