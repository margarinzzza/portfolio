import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../models/User'
import { validationResult } from "express-validator";

export const RegisterController = async (req: any, res: any) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    } else {
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      const doc = new UserModel({
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        phoneNumber: req.body.phoneNumber,
        password: passwordHash
      })
      const user = await doc.save();
      const token = jwt.sign({
        _id: user._id,
      }, 'secret', {expiresIn: '15d'})
      res.json({user, token});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Не удалось зарегистрироваться', err })
  }
}

export const checkUniqueEmail = async (req: any, res: any) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    } else {
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      const doc = new UserModel({
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        phoneNumber: req.body.phoneNumber,
        password: passwordHash
      })
      const user = await doc.save();
      const token = jwt.sign({
        _id: user._id,
      }, 'secret', {expiresIn: '15d'})
      res.json({user, token});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Не удалось зарегистрироваться', err })
  }
}

export const LoginController = async (req: any, res: any)=>{
  try {
    const [user]  = await UserModel.find({email: req.body.email})
    if (!user) {
      return res.status(404).json({message: 'Пользователь не найден'})
    } 
    const isValidPassword = await bcrypt.compare(req.body.password, user.password)
    if(!isValidPassword){
      return res.status(400).json({message: 'Неверный логин или пароль'})
    } else {
      const token = jwt.sign({
        _id: user._id,
      }, 'secret', {expiresIn: '15d'})
      res.json({user, token}) 
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({message: 'Не удалось авторизоваться'})
  }
}

export const ProfileController = async (req: any, res: any)=>{
  try {
    const user = await UserModel.findById(req.userId)
    if(!user){
      res.json('Пользователя не существует')
    } else {
      res.json({user})
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({message: 'Пользователя не существует'})
  }
}

export const RedactUserInfoConroller = async (req: any, res: any)=>{
  try {
    const user = await UserModel.findById(req.userId)
    if(!user){
      res.json('Пользователя не существует')
    } else {
      user.name = req.body.name;
      user.surname = req.body.surname;
      user.phoneNumber = req.body.phoneNumber;
      await user.save();
      res.json({user})
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({message: 'Пользователя не существует'})
  }
}
