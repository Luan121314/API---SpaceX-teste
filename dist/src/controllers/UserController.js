"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _UserModel = require('../models/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);

var _userView = require('../views/userView'); var _userView2 = _interopRequireDefault(_userView);
var _crypto = require('crypto'); var _crypto2 = _interopRequireDefault(_crypto);
var _UserValidation = require('../validates/UserValidation'); var _UserValidation2 = _interopRequireDefault(_UserValidation);

 class User {
    async create(request, response) {
        const data = request.body;

        await _UserValidation2.default.create(data)

        const hash = _crypto2.default.randomBytes(6).toString('hex');
        const user = new _UserModel2.default

        await user.create({ ...data, id: hash }, (err, doc) => {
            response.status(201).json(_userView2.default.render(doc ));
        });
        return

    }

    async index(request, response) {
        const user = new _UserModel2.default;
        const result = await user.read() ;
        return response.json(_userView2.default.renderMany(result));
    }

    async show(request, response) {
        const { id } = request.params

        await _UserValidation2.default.id({ id })

        const user = new _UserModel2.default;
        const result = await user.read(id) 
        return response.status(200).json(_userView2.default.render(result));
    }

    async update(request, response) {
        const { id } = request.params;
        const { name, gender, about, github } = request.body;
        const data = {
            id,
            name,
            gender,
            about,
            github
        }

        await _UserValidation2.default.update(data)

        const user = new _UserModel2.default;
        await user.update(data, (err, raw) => {
            const { n } = raw;
            return n  == 1 ? (
                response.status(204).json({})
            ) : (
                response.status(404).json({ message: 'id not found' }))
        })
        return
    }

    async delete(request, response) {
        const { id } = request.params

        await _UserValidation2.default.id({ id })

        const user = new _UserModel2.default;
        await user.delete(id, (err) => {
            return response.status(204).json({})
        })
    }
} exports.default = User;