"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _yup = require('yup');





const errorHandler =(error, request, response, next)=>{
    if(error instanceof _yup.ValidationError){
        let errors = {}

        error.inner.forEach(err =>{
            errors[err.path]= err.errors;
        })
        return response.status(400).json({
            message: 'validate fails',
            errors
        });
    }
    console.log(error);
    
    return response.status(500).json({
        message: 'Internal server error'
    })
}

exports. default = errorHandler;