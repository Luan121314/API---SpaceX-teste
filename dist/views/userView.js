"use strict";Object.defineProperty(exports, "__esModule", {value: true});

exports. default = {
    render(user) {

        return user ? {
            id: user.id || null,
            name: user.name || null,
            gender: user.gender || null,
            about: user.about || null,
            github: user.github || null
        } : {}
    },
    renderMany(users) {
        return users.map(user => this.render(user))
    }
}