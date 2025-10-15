import { Request, Response, NextFunction } from "express";
import { AppError } from "../common/http/responses/error.response";

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            statusCode: err.statusCode,
            timestamp: Math.floor(Date.now() / 1000),
            message: err.message,
        });
    }

    return res.status(500).json({
        success: false,
        statusCode: 500,
        message: "Internal Server Error",
    });
}