import jwt from 'jsonwebtoken';

interface JwtPayload {
  _id: string
}

export default (req: any, res: any, next: any) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret') as JwtPayload
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