import {Request, RequestHandler, Response} from 'express';
import authServices from '../services/auth.services';
import usersServices from '../services/users.services';

const getUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const authHeader = req.headers['Authorization'];
  const token = authServices.getAuthHeader(authHeader.toString());
  if (token === null) {
    res.sendStatus(401);
    return;
  }

  try {
    const response = await usersServices.getUser(token);

    res.json(response);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

export default {getUser};