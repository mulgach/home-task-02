import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const base64Auth = "admin:qwerty"

export const basicAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    const encodedAuth = Buffer.from(base64Auth).toString('base64')
    if (!authorization) {
        res.send(401)
    } else if (authorization === ('Basic ' + encodedAuth)) {
        next()
    } else {
        res.send(401)
    }
}