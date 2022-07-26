import { Request, Response } from 'express';
import { Socket } from 'socket.io';
import authServices from '../services/auth.services';

const authMiddleware = async (
  req : Request, 
  res: Response, 
  next: Function
) => {
  const authHeader = req.headers['Authorization'];

  const token = authServices.getAuthHeader(authHeader.toString());
  if (token === null) {
    res.sendStatus(401);
    return;
  }
  
  try {
    const validToken = await authServices.validateToken(token);
    if (!validToken) {
      res.sendStatus(401);
      return;
    }
    next();
  } catch(error) {
    res.status(500).send({error});
  }
}

const authSocketMiddleware = async (
  socket: Socket, 
  next: Function
) => {
  const authHeader = socket.handshake.headers['Authorization'];
    
  const token = authServices.getAuthHeader(authHeader.toString());
  if (token === null) {
    next(new Error('Unauthorized'));
    return;
  }
  
  try {
    const validToken = await authServices.validateToken(token);
    if (!validToken) {
      next(new Error('Unauthorized'));
      return;
    }
    next();
  } catch(error) {
    next(error);
  }
}

export default {
  authMiddleware,
  authSocketMiddleware
};