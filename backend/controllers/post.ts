import { Request, Response, NextFunction } from 'express';
import Item from '../models/item';
import User from '../models/user';
import moment from 'moment';
import dotenv from 'dotenv';
dotenv.config();
const apiKey = process.env.SENDGRID_API_KEY;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(apiKey);

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
    const msg = {
      // to: pickerEmail,
      to: 'dcca12@gmail.com',
      from: 'dcca12@gmail.com',
      subject: `You need to get the item: ${item.name} | Homolog: ${item.pickerEmail}`,
      html: `
        <h1>Get the item: ${item.name}</h1>
        <p>You have been selected to the get:</p>
        <ul>
          <li>Item: ${item.name}</li>
          <li>Pick Up Date: ${moment(item.pickUpDate).format('LLLL')}</li>
        </ul>
        <a href='http://localhost:3000/account/picker'>Check Your Items</a>
        `,
    };
    sgMail.send(msg);
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

export const deleteItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const itemId = req.params.itemId;
    if (!itemId || !userId) {
      return res.status(404).json('Bad item id or user id');
    }
    const item = await Item.findById(itemId);
    const user = await User.findById(userId);
    if (!item || !user) {
      return res.status(404).json('User or item not found');
    }
    // Get item index
    const itemIndex = user.items.findIndex(
      (val) => val.toString() === item._id.toString()
    );
    // Remove item
    user.items.splice(itemIndex!);
    // Save user
    // user.items = newItems;
    await user.save();
    await item.remove();
    return res.status(200).json(`Delete item: ${item}`);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const postPickerItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { pickerEmail } = req.body;
  console.log(req.body);

  try {
    const items = await Item.find({ pickerEmail });
    if (!items || items.length < 1) {
      return res.status(404).json('No item found');
    }
    return res.status(200).json(items);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
