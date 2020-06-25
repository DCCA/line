import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secret = process.env.SECRET || 'secret';

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.get('Authorization')?.split(' ')[1];
  // Verify token
  const isValid = await jwt.verify(token!, secret);
  if (!isValid) {
    return res.status(403).json('Forbidden access');
  }
  next();
};
