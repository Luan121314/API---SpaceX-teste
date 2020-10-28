"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
require('express-async-errors');
var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _handler = require('./errors/handler'); var _handler2 = _interopRequireDefault(_handler);
var _connection = require('./services/database/connection'); var _connection2 = _interopRequireDefault(_connection);

if(process.env.NODE_ENV != "PRODUCTION"){
    _dotenv2.default.config()
    console.log('Enviroment variable loading');
}

const app = _express2.default.call(void 0, );
app.use(_express2.default.json());
app.use(_cors2.default.call(void 0, ));
app.use(_routes2.default);
_connection2.default.call(void 0, );
app.use(_handler2.default);


const port = process.env.PORT || 3333;

app.listen(port, ()=>{
    console.log(`Running server in port ${port}`);
});