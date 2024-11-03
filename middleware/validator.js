import { body } from 'express-validator';

const emptyMsg = 'cannot be empty';
const lengthMsg = 'should be between 2 and 50 characters';

export const signupValidator = [
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage(`Full name ${emptyMsg}`)
    .isLength({ min: 2, max: 50 })
    .withMessage(`Full name ${lengthMsg}`),
  body('username')
    .trim()
    .notEmpty()
    .withMessage(`Username ${emptyMsg}`)
    .isLength({ min: 2, max: 50 })
    .withMessage(`Username ${lengthMsg}`),
  body('password')
    .trim()
    .notEmpty()
    .withMessage(`Password ${emptyMsg}`)
    .isLength({ min: 2, max: 50 })
    .withMessage(`Password ${lengthMsg}`),
  body('confirmPassword').custom((val, { req }) => {
    if (val !== req.body.password) throw new Error('Password did not match');
    return true;
  }),
];

export const postValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage(`Title ${emptyMsg}`)
    .isLength({ min: 5, max: 100 })
    .withMessage('Title should be between 5 - 100 characters!'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage(`Content ${emptyMsg}`)
    .isLength({ min: 10, max: 500 })
    .withMessage('Content should be between 10 - 500 characters!'),
];
