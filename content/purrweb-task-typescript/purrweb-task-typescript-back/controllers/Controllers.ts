import jwt from 'jsonwebtoken';
//import bcrypt from 'bcryptjs';
import UserModel from '../models/User'
import { validationResult } from "express-validator";

export const RegisterController = async (req: any, res: any) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }
    const phoneUnique = await UserModel.find({ phoneNumber: req.body.phoneNumber })
    if (phoneUnique.length > 0) {
      return res.status(400).json({ msg: 'Пользователь с таким телефоном существует' })
    }
    const doc = new UserModel({
      email: req.body.email,
      name: req.body.name,
      surname: req.body.surname,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
    })
    const user = await doc.save();
    const token = jwt.sign({
      _id: user._id,
    }, 'secret', { expiresIn: '15d' })
    res.json({ user, token });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Не удалось зарегистрироваться', err })
  }
}

export const checkEmailUnique = async (req: any, res: any) => {
  try {
    const candidate = await UserModel.find({ email: req.body.email })
    if (candidate.length > 0) {
      return res.status(400).json({ msg: 'Пользователь с таким Email существует' })
    }
    res.status(200).json();

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Не удалось зарегистрироваться', err })
  }
}

export const LoginController = async (req: any, res: any) => {
  try {
    const [user] = await UserModel.find({ email: req.body.email })
    if (!user) {
      return res.status(404).json({ msg: 'Неверный логин или пароль' })
    }
    if (req.body.password !== user.password) {
      return res.status(400).json({ msg: 'Неверный логин или пароль' })
    } else {
      const token = jwt.sign({
        _id: user._id,
      }, 'secret', { expiresIn: '15d' })
      res.json({ user, token })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Не удалось авторизоваться' })
  }
}

export const ProfileController = async (req: any, res: any) => {
  try {
    const user = await UserModel.findById(req.userId)
    if (!user) {
      res.json('Пользователя не существует')
    } else {
      res.json({ user })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Пользователя не существует' })
  }
}

export const RedactUserInfoConroller = async (req: any, res: any) => {
  try {
    const user = await UserModel.findById(req.userId)
    const phoneUnique = await UserModel.find({ phoneNumber: req.body.phoneNumber })
    if (phoneUnique.length > 0 && user?.phoneNumber !== req.body.phoneNumber) {
      return res.status(400).json({ msg: 'Пользователь с таким телефоном существует' })
    }
    if (!user) return res.json('Пользователя не существует')
    user.name = req.body.name;
    user.surname = req.body.surname;
    user.phoneNumber = req.body.phoneNumber;
    user.password = req.body.password;
    await user.save();
    return res.json({ user })
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Пользователя не существует' })
  }
}
