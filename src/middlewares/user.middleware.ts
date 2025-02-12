import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";

interface AuthRequest extends Request {
    userId?: string;
}

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // Extract the "authorization" header from the request.
    const header = req.headers["authorization"];
    console.log(header);
    // Verify the JWT token using the secret key.
    const decoded = jwt.verify(header as string, process.env.JWT_SECRET as string);

    // If the token is successfully decoded, attach the user ID to the request object.
    if (decoded) {
        // @ts-ignore
        req.userId = decoded.id; // Store the decoded user ID for later use in request handling.
        next(); // Call the next middleware or route handler.
    } else {
        // If the token is invalid, send a 401 Unauthorized response.
        res.status(401).json({ message: "Unauthorized User" });
    }
};