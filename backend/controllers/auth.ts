import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config;

export const postSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Validation
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    return res.status(406).json(validationError);
  }
  const { name, email, password } = req.body;
  //   Check if email is already on db
  try {
    //   Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    throw new Error('Something went wrong!');
  }
};

export const postLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Validation
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    return res.status(406).json(validationError);
  }
  const { email, password } = req.body;

  //   Find the user in the DB
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json('No user found');
    }
    //   Compare the password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(404).json('Password is wrong');
    }
    //   Give a JWT
    const token = jwt.sign({ userId: user._id }, process.env.SECRET!);
    //   Log-in the user
    return res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.params.token;
  // Verify token
  const isValid = await jwt.verify(token, process.env.SECRET!);
  if (!isValid) {
    return res.json(false);
  }
  return res.json(true);
};
