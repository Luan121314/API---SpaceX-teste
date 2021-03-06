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
}

export default ValidationGeneric;