import { UsersModelInterface } from "../models/UsersModels";

export default {
    render(user: UsersModelInterface) {

        return user ? {
            id: user.id || null,
            name: user.name || null,
            gender: user.gender || null,
            about: user.about || null,
            github: user.github || null
        } : {}
    },
    renderMany(users: UsersModelInterface[]) {
        return users.map(user => this.render(user))
    }
}