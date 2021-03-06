"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _yup = require('yup'); var yup = _interopRequireWildcard(_yup);

class ValidationGeneric {
    async id(id) {
        const schema = yup.object().shape({
            id: yup.string().required().length(12)
        })

        await schema.validate(id, {
            abortEarly: false
        })
        return
    }

     messageRequired(field){
        return `O campo ${field} deve ser preenchido`
    }
}

exports. default = ValidationGeneric;