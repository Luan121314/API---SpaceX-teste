"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const connection = () => {
    const password = process.env.PASSWORD;
    const dbName = process.env.DATABASE_NAME;
    const urlConnetion = `mongodb+srv://user01:${password}@mongodatabase01-7udss.mongodb.net/${dbName}?retryWrites=true&w=majority`;
    
    _mongoose2.default.connect(urlConnetion,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            appname: dbName,
            autoIndex: true
        }, err => {
            if (err) {
                console.log(err);

                return
            };
            console.log('Database conected ')
        });
}

exports. default = connection



