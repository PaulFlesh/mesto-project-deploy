import { JwtPayload, verify } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import Unathorized from '../errors/Unauthorized';

const { JWT_SECRET } = require('../config');

export default (req: any, res: Response, next: NextFunction) => { // any
  const token = req.cookies.userId;
  //const { authorization } = req.headers;
  //if (!authorization || !authorization.startsWith('Bearer ')) {
  //  throw new Unathorized('Необходима авторизация');
  //}
  let payload;
  try {
    payload = verify(token, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
    //payload = verify(authorization!.replace('Bearer ', ''), 'super-strong-secret');
  } catch (err) {
    throw new Unathorized('Необходима авторизация');
  }
  req.user = payload as { _id: JwtPayload };
  next();
};
