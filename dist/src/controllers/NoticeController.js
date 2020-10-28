"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _NoticeModel = require('../models/NoticeModel'); var _NoticeModel2 = _interopRequireDefault(_NoticeModel);

var _noticeView = require('../views/noticeView'); var _noticeView2 = _interopRequireDefault(_noticeView);
var _crypto = require('crypto'); var _crypto2 = _interopRequireDefault(_crypto);
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

 class Notice {
    async create(request, response) {
        const data = request.body;

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            headline: Yup.string().required(),
            notice: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false
        });

        const hash = _crypto2.default.randomBytes(6).toString('hex');
        const publicationDate = new Date().toISOString();
        const noticie = new _NoticeModel2.default

        await noticie.create({ ...data, id: hash, publicationDate }, (err, doc) => {
            response.status(201).json(_noticeView2.default.render(doc ));
        });
        return

    }

    async index(request, response) {
        const noticie = new _NoticeModel2.default;
        const result = await noticie.read() ;
        return response.json(_noticeView2.default.renderMany(result));
    }

    async show(request, response) {
        const { id } = request.params

        const schema = Yup.object().shape({
            id: Yup.string().required().length(12)
        });
        await schema.validate({ id }, {
            abortEarly: false
        });

        const noticie = new _NoticeModel2.default;
        const result = await noticie.read(id) 
        return response.status(200).json(_noticeView2.default.render(result));
    }

    async update(request, response) {
        const { id } = request.params;
        const { title, headline, notice } = request.body;
        const data = {
            id,
            title,
            headline,
            notice
        } 

        const schema = Yup.object().shape({
            id: Yup.string().required().length(12),
            title: Yup.string().required(),
            headline: Yup.string().required(),
            notice: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false
        })

        const noticie = new _NoticeModel2.default;
        await noticie.update(data, (err, raw) => {
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

        const noticie = new _NoticeModel2.default;
        await noticie.delete(id, (err) => {
            return response.status(204).json({})
        })
    }
} exports.default = Notice;