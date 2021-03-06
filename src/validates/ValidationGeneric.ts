import * as yup from 'yup';

class ValidationGeneric {
    async id(id: { id: string }) {
        const schema = yup.object().shape({
            id: yup.string().required().length(12)
        })

        await schema.validate(id, {
            abortEarly: false
        })
        return
    }

    protected messageRequired(field:string){
        return `O campo ${field} deve ser preenchido`
    }
}

export default ValidationGeneric;