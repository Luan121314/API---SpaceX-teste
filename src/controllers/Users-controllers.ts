import { Request, Response } from 'express';
import Users from '../models/Users-models';
import { UsersModelInterface } from '../models/Users-models'
import usersViews from '../views/users-views';
import cripto from 'crypto';

export default class {
    async create(request: Request, response: Response) {
        const data = request.body
        const user = new Users
        const hash = cripto.randomBytes(6).toString('hex');
        await user.create({ ...data, id: hash }, (err, doc) => {
            if (err) {
                console.log(err);
                return response.status(500).json({});
            }
            response.status(201).json(usersViews.render(doc as UsersModelInterface))
        });
        return

    }

    async index(request: Request, response: Response) {
        const user = new Users;
        const result = await user.read() as UsersModelInterface[];
        return response.json(usersViews.renderMany(result));
    }

    async show(request: Request, response: Response) {
        const { id } = request.params
        const user = new Users;
        const result = await user.read(id) as UsersModelInterface
        return response.status(200).json(usersViews.render(result));
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const data = request.body;
        const user = new Users;
        await user.update({ ...data, id }, (err, raw) => {
            if (err) {
                return response.status(500).json({});
            }
            const { n } = raw;
            return n as number == 1 ? (
                response.status(204).json({})
            ) : (
                    response.status(404).json({ message: 'id not found' }))
        })
        return
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const user = new Users;
        await user.delete(id, (err) => {
            if (err) {
                return response.status(500).json({});
            }
            return response.status(204).json({})
        })
    }
}