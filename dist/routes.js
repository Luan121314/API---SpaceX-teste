"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('./controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _NoticeController = require('./controllers/NoticeController'); var _NoticeController2 = _interopRequireDefault(_NoticeController);

const route = _express.Router.call(void 0, );
const user = new _UserController2.default;

route.get('/users', user.index);
route.get('/users/:id', user.show);
route.post('/users', user.create);
route.put('/users/:id', user.update);
route.delete('/users/:id', user.delete);



const notice = new _NoticeController2.default;

route.get('/notices', notice.index);
route.get('/notices/:id', notice.show);
route.post('/notices', notice.create);
route.put('/notices/:id', notice.update);
route.delete('/notices/:id', notice.delete);

exports. default = route;