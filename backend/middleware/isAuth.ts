import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

interface userPayload {
  userId: string;
}

// Change property of a already declared type
declare global {
  namespace Express {
    interface Request {
      userId?: string | object | userPayload;
    }
  }
}

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.get('Authorization')?.split(' ')[1];
  // Verify token
  const decodedToken: any = await jwt.verify(token!, process.env.SECRET!);
  if (!decodedToken) {
    return res.status(403).json('Forbidden access');
  }
  req.userId = decodedToken.userId;
  next();
};
