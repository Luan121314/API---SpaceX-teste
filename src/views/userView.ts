import { UserModelInterface } from "../models/UserModel";

export default {
    render(user: UserModelInterface) {

        return user ? {
            id: user.id || null,
            name: user.name || null,
            gender: user.gender || null,
            about: user.about || null,
            github: user.github || null
        } : {}
    },
    renderMany(users: UserModelInterface[]) {
        return users.map(user => this.render(user))
    }
}