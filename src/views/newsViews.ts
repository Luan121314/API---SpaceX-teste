import { NewsModelInterface } from "../models/NewsModels";

export default {
    render(news: NewsModelInterface) {

        return news ? {
            id: news.id || null,
            headline: news.title || null,
            news: news.headline || null,
            publicationDate: news.publicationDate || null
        } : {}
    },
    renderMany(noticies: NewsModelInterface[]) {
        return noticies.map(news => this.render(news ))
    }
}