import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validationRes = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    return res.status(406).json(validationError);
  }
  next();
};
