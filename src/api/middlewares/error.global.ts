import { NextFunction, Request, Response } from 'express';

function unexpectedErrorMiddleware(error: Error, request: Request, response: Response, next: NextFunction) {
    const status = 500;
    const message = 'Something went wrong';
    response
        .status(status)
        .send({
            status,
            message,
        })
}

export default unexpectedErrorMiddleware;