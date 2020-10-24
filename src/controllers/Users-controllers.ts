import { Request, Response } from 'express';
import Users from '../models/Users-models';
import { UsersModelInterface } from '../models/Users-models'
import usersViews from '../views/users-views';
import cripto from 'crypto';
import * as Yup from 'yup';

export default class {
    async create(request: Request, response: Response) {
        const data = request.body;

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            gender: Yup.string().required().equals(['masculino', 'feminino', 'outros'])
        });

        await schema.validate(data, {
            abortEarly: false
        });

        const hash = cripto.randomBytes(6).toString('hex');
        const user = new Users

        await user.create({ ...data, id: hash }, (err, doc) => {
            response.status(201).json(usersViews.render(doc as UsersModelInterface));
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

        const schema = Yup.object().shape({
            id: Yup.string().required().length(12)
        });
        await schema.validate({ id }, {
            abortEarly: false
        });

        const user = new Users;
        const result = await user.read(id) as UsersModelInterface
        return response.status(200).json(usersViews.render(result));
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { name, gender } = request.body;
        const data = {
            id,
            name,
            gender
        }

        const schema = Yup.object().shape({
            id: Yup.string().required().length(12),
            name: Yup.string().required(),
            gender: Yup.string().required().equals(['masculino', 'feminino', 'outros'])
        });

        await schema.validate(data, {
            abortEarly: false
        })

        const user = new Users;
        await user.update(data, (err, raw) => {
            const { n } = raw;
            return n as number == 1 ? (
                response.status(204).json({})
            ) : (
                    response.status(404).json({ message: 'id not found' }))
        })
        return
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params

        const schema = Yup.object().shape({
            id: Yup.string().required().length(12)
        });

        await schema.validate({ id }, {
            abortEarly: false
        });

        const user = new Users;
        await user.delete(id, (err) => {
            return response.status(204).json({})
        })
    }
}