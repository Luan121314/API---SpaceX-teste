import { Schema, model } from 'mongoose';


const newsSchema = new Schema(
    {
        id: String,
        title: String,
        headline: String,
        news: String,
        publicationDate:Date  
    }, { collection: 'news' }
)
const NewsModel = model('news', newsSchema);

export interface NewsModelInterface {

    id: string
    title: string,
    headline: string,
    news: string,
    publicationDate?: Date
}


class News {
    async create(data: NewsModelInterface, callBack?: (err: any, doc: {}) => void) {
        const user = new NewsModel(data);
        return await user.save(callBack);
    }

    async read(id?: string, callBack?: (err: any, doc: {}) => void): Promise<unknown[] | unknown> {
        return id ? await NewsModel.findOne({ id }, callBack) : await NewsModel.find(callBack);
    }

    async update(data: NewsModelInterface, callback?: (err: any, raw: any) => void) {
        const { title, headline, news ,id } = data;
        await NewsModel.updateOne({ id }, { title, headline, news }, callback);
    }
    async delete(id: string, callback?: (err: any) => void) {
        await NewsModel.deleteOne({id}, callback);
    }
}

export default News;