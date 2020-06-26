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
    body('itemName')
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage('Please insert a item name with min of 5 chars'),
    body('pickerName')
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage('Please insert the picker name with a min of 5 chars'),
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
router.post(
  '/picker-items',
  // [body('pickerEmail').isEmail().withMessage('Please use a valid e-mail')],
  // validationRes,
  postController.postPickerItems
);

// Edit item

export default router;
