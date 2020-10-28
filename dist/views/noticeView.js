"use strict";Object.defineProperty(exports, "__esModule", {value: true});

exports. default = {
    render(notice) {

        return notice ? {
            id: notice.id || null,
            title: notice.title || null,
            headline: notice.headline || null,
            notice: notice.notice || null,
            publicationDate: notice.publicationDate || null
        } : {}
    },
    renderMany(noticies) {
        return noticies.map(notice => this.render(notice ))
    }
}