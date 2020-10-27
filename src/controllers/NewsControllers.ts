import { Request, Response } from 'express';
import News from '../models/NewsModels';
import { NewsModelInterface } from '../models/NewsModels'
import newsViews from '../views/newsViews';
import cripto from 'crypto';
import * as Yup from 'yup';

export default class {
    async create(request: Request, response: Response) {
        const data = request.body;

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            headline: Yup.string().required(),
            news: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false
        });

        const hash = cripto.randomBytes(6).toString('hex');
        const publicationDate = new Date().toISOString();
        const noticie = new News

        await noticie.create({ ...data, id: hash, publicationDate }, (err, doc) => {
            response.status(201).json(newsViews.render(doc as NewsModelInterface));
        });
        return

    }

    async index(request: Request, response: Response) {
        const noticie = new News;
        const result = await noticie.read() as NewsModelInterface[];
        return response.json(newsViews.renderMany(result));
    }

    async show(request: Request, response: Response) {
        const { id } = request.params

        const schema = Yup.object().shape({
            id: Yup.string().required().length(12)
        });
        await schema.validate({ id }, {
            abortEarly: false
        });

        const noticie = new News;
        const result = await noticie.read(id) as NewsModelInterface
        return response.status(200).json(newsViews.render(result));
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { title, headline, news } = request.body;
        const data = {
            id,
            title,
            headline,
            news
        } as NewsModelInterface

        const schema = Yup.object().shape({
            id: Yup.string().required().length(12),
            title: Yup.string().required(),
            headline: Yup.string().required(),
            news: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false
        })

        const noticie = new News;
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

        const noticie = new News;
        await noticie.delete(id, (err) => {
            return response.status(204).json({})
        })
    }
}