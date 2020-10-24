import { UsersModelInterface } from "../models/Users-models";

export default {
    render(user: UsersModelInterface) {
        return {
            id: user.id,
            name: user.name,
            gender: user.gender
        }
    },
    renderMany(users: UsersModelInterface[]) {
        return users.map(user => this.render(user))
    }
}