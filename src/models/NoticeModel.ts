import { Schema, model } from 'mongoose';


const newsSchema = new Schema(
    {
        id: String,
        title: String,
        headline: String,
        notice: String,
        publicationDate:Date  
    }, { collection: 'notices' }
)
const NewsModel = model('notice', newsSchema);

export interface NoticeModelInterface {

    id: string
    title: string,
    headline: string,
    notice: string,
    publicationDate?: Date
}


class News {
    async create(data: NoticeModelInterface, callBack?: (err: any, doc: {}) => void) {
        const user = new NewsModel(data);
        return await user.save(callBack);
    }

    async read(id?: string, callBack?: (err: any, doc: {}) => void): Promise<unknown[] | unknown> {
        return id ? await NewsModel.findOne({ id }, callBack) : await NewsModel.find(callBack);
    }

    async update(data: NoticeModelInterface, callback?: (err: any, raw: any) => void) {
        const { title, headline, notice ,id } = data;
        await NewsModel.updateOne({ id }, { title, headline, notice }, callback);
    }
    async delete(id: string, callback?: (err: any) => void) {
        await NewsModel.deleteOne({id}, callback);
    }
}

export default News;