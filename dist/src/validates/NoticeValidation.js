"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var yup = _interopRequireWildcard(_yup);
var _ValidationGeneric = require('./ValidationGeneric'); var _ValidationGeneric2 = _interopRequireDefault(_ValidationGeneric);











class NoticeValidation extends _ValidationGeneric2.default {
    constructor() {
        super()
    }

    async update(data) {
        const scheme = yup.object().shape({
            id: yup.string().required(),
            title: yup.string().required(this.messageRequired("titulo")),
            headline: yup.string().required(this.messageRequired("manchete")),
            notice: yup.string().required(this.messageRequired("noticia"))
        })

        await scheme.validate(data, {
            abortEarly: false
        })
    }

    async create(data) {
        const scheme = yup.object().shape({
            title: yup.string().required(this.messageRequired("titulo")),
            headline: yup.string().required(this.messageRequired("manchete")),
            notice: yup.string().required(this.messageRequired("noticia"))
        })

        await scheme.validate(data, {
            abortEarly: false
        })

    }


}

exports. default = new NoticeValidation();