"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var yup = _interopRequireWildcard(_yup);
var _ValidationGeneric = require('./ValidationGeneric'); var _ValidationGeneric2 = _interopRequireDefault(_ValidationGeneric);











class UserValidation extends _ValidationGeneric2.default {
    constructor() {
        super()
    }

    async update(data) {
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

    async create(data) {
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

exports. default = new UserValidation();