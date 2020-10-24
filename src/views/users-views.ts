import { UsersModelInterface } from "../models/Users-models";

export default {
    render(user: UsersModelInterface) {

        return user ? {
            id: user.id || null,
            name: user.name || null,
            gender: user.gender || null
        } : {}
    },
    renderMany(users: UsersModelInterface[]) {
        return users.map(user => this.render(user))
    }
}