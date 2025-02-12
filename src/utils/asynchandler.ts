import { Request, Response, NextFunction } from "express";

type RequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void> | void;

const asyncHandler = (requestHandler: RequestHandler) => 
    (req: Request, res: Response, next: NextFunction): void => {
        console.log("inside async handler");
        Promise.resolve(requestHandler(req, res, next)).catch(next);
    };

export { asyncHandler };
