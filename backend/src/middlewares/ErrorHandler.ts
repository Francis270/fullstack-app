import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import ErrorResponse from '../interfaces/ErrorResponse';
import { NODE_ENV } from '../utils/config';

const ErrorHandler = (err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) => {
	const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    const message = err.message || 'Something went wrong.';

	if (statusCode === 422) {
		const zodError = err as ZodError;
		
		if (zodError.errors.length) {
			return res.status(statusCode).send({
				message: zodError.errors[0].message,
				stack: NODE_ENV === 'production' ? '🥞' : err.stack
			});
		}
	}
	res.status(statusCode).send({
	    message: message,
	    stack: NODE_ENV === 'production' ? '🥞' : err.stack
  	});
}

export default ErrorHandler;