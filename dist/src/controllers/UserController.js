"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _UserModel = require('../models/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);

var _userView = require('../views/userView'); var _userView2 = _interopRequireDefault(_userView);
var _crypto = require('crypto'); var _crypto2 = _interopRequireDefault(_crypto);
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

 class User{
    async create(request, response) {
        const data = request.body;

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            gender: Yup.string().required().equals(['Masculino', 'Feminino', 'Outros']),
            about: Yup.string().required(),
            github: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false
        });

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

        const schema = Yup.object().shape({
            id: Yup.string().required().length(12)
        });
        await schema.validate({ id }, {
            abortEarly: false
        });

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

        const schema = Yup.object().shape({
            id: Yup.string().required().length(12),
            name: Yup.string().required(),
            gender: Yup.string().required().equals(['Masculino', 'Feminino', 'Outros']),
            about: Yup.string().required(),
            github: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false
        })

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

        const schema = Yup.object().shape({
            id: Yup.string().required().length(12)
        });

        await schema.validate({ id }, {
            abortEarly: false
        });

        const user = new _UserModel2.default;
        await user.delete(id, (err) => {
            return response.status(204).json({})
        })
    }
} exports.default = User;