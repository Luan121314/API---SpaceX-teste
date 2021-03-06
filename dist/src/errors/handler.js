"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _yup = require('yup');







const errorHandler = (error, request, response, next) => {
    if (error instanceof _yup.ValidationError) {

        const validation = error;


        const errorsSerialized = validation.inner.map((err) => ({
            field: err.path,
            errors: err.errors,
            value: err.value
        }))


        return response.status(400).json({
            message: 'validate fails',
            errors: errorsSerialized
        });
    }
    console.log(error);

    return response.status(500).json({
        message: 'Internal server error'
    })
}

exports. default = errorHandler;