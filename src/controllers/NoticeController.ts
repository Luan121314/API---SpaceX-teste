import { Request, Response } from 'express';
import NoticeModel from '../models/NoticeModel';
import { NoticeModelInterface } from '../models/NoticeModel'
import NoticeView from '../views/noticeView';
import cripto from 'crypto';
import * as Yup from 'yup';

export default class Notice {
    async create(request: Request, response: Response) {
        const data = request.body;

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            headline: Yup.string().required(),
            notice: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false
        });

        const hash = cripto.randomBytes(6).toString('hex');
        const publicationDate = new Date().toISOString();
        const noticie = new NoticeModel

        await noticie.create({ ...data, id: hash, publicationDate }, (err, doc) => {
            response.status(201).json(NoticeView.render(doc as NoticeModelInterface));
        });
        return

    }

    async index(request: Request, response: Response) {
        const noticie = new NoticeModel;
        const result = await noticie.read() as NoticeModelInterface[];
        return response.json(NoticeView.renderMany(result));
    }

    async show(request: Request, response: Response) {
        const { id } = request.params

        const schema = Yup.object().shape({
            id: Yup.string().required().length(12)
        });
        await schema.validate({ id }, {
            abortEarly: false
        });

        const noticie = new NoticeModel;
        const result = await noticie.read(id) as NoticeModelInterface
        return response.status(200).json(NoticeView.render(result));
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { title, headline, notice } = request.body;
        const data = {
            id,
            title,
            headline,
            notice
        } as NoticeModelInterface

        const schema = Yup.object().shape({
            id: Yup.string().required().length(12),
            title: Yup.string().required(),
            headline: Yup.string().required(),
            notice: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false
        })

        const noticie = new NoticeModel;
        await noticie.update(data, (err, raw) => {
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

        const noticie = new NoticeModel;
        await noticie.delete(id, (err) => {
            return response.status(204).json({})
        })
    }
}