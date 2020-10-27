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
const UsersModel = model('users', userSchema);

export interface UsersModelInterface {

    id?: string
    name: string,
    gender: string,
    about: string,
    github: string
}


class Users {
    async create(data: UsersModelInterface, callBack?: (err: any, doc: {}) => void) {
        const user = new UsersModel(data);
        return await user.save(callBack);
    }

    async read(id?: string, callBack?: (err: any, doc: {}) => void): Promise<unknown[] | unknown> {
        return id ? await UsersModel.findOne({ id }, callBack) : await UsersModel.find(callBack);
    }

    async update(data: UsersModelInterface, callback?: (err: any, raw: any) => void) {
        const {about, github, gender, name, id } = data;
        await UsersModel.updateOne({ id }, { name, about, github, gender }, callback);
    }
    async delete(id: string, callback?: (err: any) => void) {
        await UsersModel.deleteOne({id}, callback);
    }
}

export default Users;