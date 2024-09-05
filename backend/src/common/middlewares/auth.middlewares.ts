import { verifyToken } from "../../services/tokens/token.validator";
import { evalException } from "../exceptions/exceptions";

import { Request, NextFunction, Response } from "express";

export interface CustomRequest extends Request{
    username?: string;
};

export const verifyJWTToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const auth = req.header('Authorization');
    const token = auth ? auth.replace('Bearer ', '') : null;

    try {
        let decodedToken = await verifyToken(token);
        req.username = decodedToken.username;
        next();
    } catch (error: any) {
        return evalException(error, res);
    }
};