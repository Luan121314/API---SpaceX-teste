import { Schema, model } from 'mongoose';
import '../services/database/connection';


const userSchema = new Schema(
    {
        id: String,
        name: String,
        gender: String
    }, { collection: 'users' }
)
const UsersModel = model('users', userSchema);

export interface UsersModelInterface {

    id?: string
    name: string,
    gender: string
}


class Users {
    async create(data: UsersModelInterface, callBack: (err: any, doc: {}) => void) {
        const user = new UsersModel(data);
        return await user.save(callBack);
    }

    async read(id?: string): Promise<unknown[] | unknown> {
        return id ? await UsersModel.findOne({ id }) : await UsersModel.find();
    }

    async update(data: UsersModelInterface, callback?: (err: any, raw: any) => void) {
        const { gender, name, id } = data;
        await UsersModel.updateOne({ id }, { name, gender }, callback);
    }
    async delete(id: string, callback?: (err: any) => void) {
        await UsersModel.deleteOne({id}, callback);
    }
}

export default Users;