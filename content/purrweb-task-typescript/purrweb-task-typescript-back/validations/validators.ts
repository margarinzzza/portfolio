import { body } from "express-validator";

export const registerValidator = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Длинна должна быть не менее 8 символов').isLength({min: 8}),
];

export const redactUserInfoValidator = [
  body('name', 'Укажите имя').isString().isLength({min: 2}),
  body('surname', 'Укажите фамилию').isString().isLength({min: 2}),
  body('phoneNumber', 'Неверный формат номера телефона').isLength({min: 11, max: 11}),
  body('password', 'Длинна должна быть не менее 8 символов').isLength({min: 8}),
];
