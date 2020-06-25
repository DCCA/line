import express from 'express';
import * as postController from '../controllers/post';
import { body } from 'express-validator';
import { validationRes } from '../middleware/validation';
import { isAuth } from '../middleware/isAuth';

const router = express.Router();

// Create item
router.post(
  '/create-item',
  isAuth,
  [
    body('itemName').notEmpty().withMessage('Please insert a item name'),
    body('pickerName').notEmpty().withMessage('Please insert the picker name'),
    body('pickerEmail').isEmail().withMessage('Please insert a valid e-mail'),
    body('pickUpDate').isISO8601().withMessage('Please insert a valid date'),
  ],
  validationRes,
  postController.postCreateItem
);

// Get all items
router.get('/items', isAuth, postController.getItems);

// Delete item
router.delete('/delete-item/:itemId', isAuth, postController.deleteItem);

// Get specific item

// Edit item

export default router;
