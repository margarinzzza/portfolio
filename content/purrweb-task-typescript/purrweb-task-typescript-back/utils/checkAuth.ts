import jwt from 'jsonwebtoken';
import UserModel from '../models/User'

interface JwtPayload {
  _id: string
}

export default async (req: any, res: any, next: any) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret') as JwtPayload
      const candidate  = await UserModel.findById(decoded._id)
    if (!candidate) {
      return res.status(404).json({message: 'Пользователь не найден'})
    } 
      req.userId = decoded._id;
      next();
    } catch (err) {
      console.log(err)
      return res.status(403).json('токен нерабочий')
    }
  } else {
    return res.status(403).json('Нет доступа') 
  }
}