import { Schema, model } from 'mongoose';


const userSchema = new Schema(
    {
        id: String,
        name: String,
        gender: String,
        about: String,
        github: String
    }, { collection: 'users' }
)
const UserModel = model('users', userSchema);

export interface UserModelInterface {

    id?: string
    name: string,
    gender: string,
    about: string,
    github: string
}


class Users {
    async create(data: UserModelInterface, callBack?: (err: any, doc: {}) => void) {
        const user = new UserModel(data);
        return await user.save(callBack);
    }

    async read(id?: string, callBack?: (err: any, doc: {}) => void): Promise<unknown[] | unknown> {
        return id ? await UserModel.findOne({ id }, callBack) : await UserModel.find(callBack);
    }

    async update(data: UserModelInterface, callback?: (err: any, raw: any) => void) {
        const {about, github, gender, name, id } = data;
        await UserModel.updateOne({ id }, { name, about, github, gender }, callback);
    }
    async delete(id: string, callback?: (err: any) => void) {
        await UserModel.deleteOne({id}, callback);
    }
}

export default Users;