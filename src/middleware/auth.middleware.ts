import { NextFunction, Request, Response } from 'express';
import { Socket } from 'socket.io';
import usersServices from '../services/users.services';

const authMiddleware = async (req : Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['Authorization'];

  const token = getAuthHeader(authHeader.toString());
  if (token === null) {
    return res.sendStatus(401);
  }
  
  try {
    const isValid = await usersServices.validateToken(token);
    if (!isValid) {
      return res.sendStatus(401);
    }
    next();
  } catch(error) {
    res.status(500).send({error});
  }
}

const authSocketMiddleware = async (socket: Socket, next) => {
  const authHeader = socket.handshake.headers['Authorization'];
    
  const token = getAuthHeader(authHeader.toString());
  if (token === null) {
    return next(new Error('Unauthorized'));
  }
  
  try {
    const isValid = await usersServices.validateToken(token);
    if (!isValid) {
      return next(new Error('Unauthorized'));
    }
    next();
  } catch(error) {
    next(error);
  }
}

const getAuthHeader = (authHeader: string): string => {
  if (authHeader === null || typeof authHeader === 'undefined') {
    return null;
  }
  return authHeader.split(' ')[1];
}

export default {
  authMiddleware,
  authSocketMiddleware
};