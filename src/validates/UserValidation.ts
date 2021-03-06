import * as yup from 'yup';
import ValidationGeneric from './ValidationGenéric';

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
            name: yup.string().required("O campo 'nome' deve ser preenchido"),
            gender: yup.string().required().equals(['Masculino', 'Feminino', 'Outros']),
            about: yup.string().required("Campo 'sobre', deve ser preenchido"),
            github: yup.string().required("Campo 'github', deve ser preenchido")
        })

        await scheme.validate(data, {
            abortEarly: false
        })
    }

    async create(data: UpdateUserProps) {
        const scheme = yup.object().shape({
            name: yup.string().required("O campo 'nome' deve ser preenchido"),
            gender: yup.string().required().equals(['Masculino', 'Feminino', 'Outros']),
            about: yup.string().required("Campo 'sobre', deve ser preenchido"),
            github: yup.string().required("Campo 'github', deve ser preenchido")
        })

        await scheme.validate(data, {
            abortEarly: false
        })

    }


}

export default new UserValidation();