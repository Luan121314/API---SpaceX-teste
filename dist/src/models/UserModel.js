"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');


const userSchema = new (0, _mongoose.Schema)(
    {
        id: String,
        name: String,
        gender: String,
        about: String,
        github: String
    }, { collection: 'users' }
)
const UserModel = _mongoose.model.call(void 0, 'users', userSchema);











class Users {
    async create(data, callBack) {
        const user = new UserModel(data);
        return await user.save(callBack);
    }

    async read(id, callBack) {
        return id ? await UserModel.findOne({ id }, callBack) : await UserModel.find(callBack);
    }

    async update(data, callback) {
        const {about, github, gender, name, id } = data;
        await UserModel.updateOne({ id }, { name, about, github, gender }, callback);
    }
    async delete(id, callback) {
        await UserModel.deleteOne({id}, callback);
    }
}

exports. default = Users;