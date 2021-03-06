import * as yup from 'yup';
import ValidationGeneric from './ValidationGenéric';

interface NoticeProps {
    title: string;
    headline: string;
    notice: string
}

interface UpdateNoticeProps extends NoticeProps {
    id: string
}

class NoticeValidation extends ValidationGeneric {
    constructor() {
        super()
    }

    async update(data: NoticeProps) {
        const scheme = yup.object().shape({
            id: yup.string().required(),
            title: yup.string().required(),
            headline: yup.string().required(),
            notice: yup.string().required()
        })

        await scheme.validate(data, {
            abortEarly: false
        })
    }

    async create(data: UpdateNoticeProps) {
        const scheme = yup.object().shape({
            title: yup.string().required(),
            headline: yup.string().required(),
            notice: yup.string().required()
        })

        await scheme.validate(data, {
            abortEarly: false
        })

    }


}

export default new NoticeValidation();