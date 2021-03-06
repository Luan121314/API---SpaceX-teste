"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _NoticeModel = require('../models/NoticeModel'); var _NoticeModel2 = _interopRequireDefault(_NoticeModel);

var _noticeView = require('../views/noticeView'); var _noticeView2 = _interopRequireDefault(_noticeView);
var _crypto = require('crypto'); var _crypto2 = _interopRequireDefault(_crypto);
var _NoticeValidation = require('../validates/NoticeValidation'); var _NoticeValidation2 = _interopRequireDefault(_NoticeValidation);

 class Notice {
    async create(request, response) {
        const data = request.body;

        await _NoticeValidation2.default.create(data);

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

        await _NoticeValidation2.default.id({ id })

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

        await _NoticeValidation2.default.update(data)

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

        await _NoticeValidation2.default.id({id})

        const noticie = new _NoticeModel2.default;
        await noticie.delete(id, (err) => {
            return response.sendStatus(204)
        })
    }
} exports.default = Notice;