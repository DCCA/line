import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Item from '../models/item';
import User from '../models/user';
import item from '../models/item';

const secret = process.env.SECRET || 'secret';

export const postCreateItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { itemName, pickerName, pickerEmail, pickUpDate } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json('User not found');
    }
    const item = new Item({
      name: itemName,
      pickerName,
      pickerEmail,
      pickUpDate,
      userId: user._id,
    });
    const savedItem = await item.save();
    user.items.push(savedItem._id);
    await user.save();
    return res.status(201).json(savedItem._id);
  } catch (error) {
    throw new Error(error);
  }
};

export const getItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    console.log(userId);
    const items = await Item.find({ userId: userId?.toString() });
    return res.status(200).json(items);
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong in the server');
  }
};
