import * as yup from 'yup';
import ValidationGeneric from './ValidationGeneric';

interface UserProps {
    name: string;
    about: string;
    github: string
}

interface UpdateUserProps extends UserProps {
    id: string
}

class UserValidation extends ValidationGeneric {
    constructor() {
        super()
    }

    async update(data: UserProps) {
        const scheme = yup.object().shape({
            id: yup.string().required(),
            name: yup.string().required(this.messageRequired("nome")),
            gender: yup.string().required(this.messageRequired("genero")).equals(['Masculino', 'Feminino', 'Outros'], "O campo genero deve ser preecnchido com as seguintes opções, Masculino, Feminino ou Outros"),
            about: yup.string().required(this.messageRequired("sobre")),
            github: yup.string().required(this.messageRequired("github"))
        })

        await scheme.validate(data, {
            abortEarly: false
        })
    }

    async create(data: UpdateUserProps) {
        const scheme = yup.object().shape({
            name: yup.string().required(this.messageRequired("nome")),
            gender: yup.string().required(this.messageRequired("genero")).equals(['Masculino', 'Feminino', 'Outros'], "O campo genero deve ser preecnchido com as seguintes opções, Masculino, Feminino ou Outros"),
            about: yup.string().required(this.messageRequired("sobre")),
            github: yup.string().required(this.messageRequired("github"))
        })

        await scheme.validate(data, {
            abortEarly: false
        })

    }


}

export default new UserValidation();