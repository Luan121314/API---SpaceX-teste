"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');


const newsSchema = new (0, _mongoose.Schema)(
    {
        id: String,
        title: String,
        headline: String,
        notice: String,
        publicationDate:Date  
    }, { collection: 'notices' }
)
const NewsModel = _mongoose.model.call(void 0, 'notice', newsSchema);











class News {
    async create(data, callBack) {
        const user = new NewsModel(data);
        return await user.save(callBack);
    }

    async read(id, callBack) {
        return id ? await NewsModel.findOne({ id }, callBack) : await NewsModel.find(callBack);
    }

    async update(data, callback) {
        const { title, headline, notice ,id } = data;
        await NewsModel.updateOne({ id }, { title, headline, notice }, callback);
    }
    async delete(id, callback) {
        await NewsModel.deleteOne({id}, callback);
    }
}

exports. default = News;