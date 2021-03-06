import { ErrorRequestHandler, NextFunction, Response, Request } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrorsItem {
    path: string,
    errors: Array<string>,
    value: string
}

const errorHandler: ErrorRequestHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof ValidationError) {

        const validation: ValidationError = error;


        const errorsSerialized = validation.inner.map((err: ValidationErrorsItem) => ({
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

export default errorHandler;