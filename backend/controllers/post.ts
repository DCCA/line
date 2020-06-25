import { Request, Response, NextFunction } from 'express';
import Item from '../models/item';

export const postCreateItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { itemName, pickerName, pickerEmail, pickUpDate, userId } = req.body;

  const item = new Item({
    name: itemName,
    pickerName,
    pickerEmail,
    pickUpDate,
    userId,
  });

  try {
    const savedItem = await item.save();
    return res.status(201).json(savedItem._id);
  } catch (error) {
    throw new Error(error);
  }
};
