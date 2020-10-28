import { NoticeModelInterface } from "../models/NoticeModel";

export default {
    render(notice: NoticeModelInterface) {

        return notice ? {
            id: notice.id || null,
            title: notice.title || null,
            headline: notice.headline || null,
            notice: notice.notice || null,
            publicationDate: notice.publicationDate || null
        } : {}
    },
    renderMany(noticies: NoticeModelInterface[]) {
        return noticies.map(notice => this.render(notice ))
    }
}