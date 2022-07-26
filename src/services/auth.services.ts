import axios from 'axios';
import config from '../config';
import usersServices from './users.services';

const mainInstance = axios.create({
  baseURL: config.mainApiUrl,
});

const login = async (identifier: string, password: string) => {
  const response = await mainInstance.post('/auth/local', {
    identifier,
    password,
  });

  return response.data;
};

const validateToken = async (token: string): Promise<boolean>  => {
  try {
    const response = await usersServices.getUser(token);

    return response != null;
  } catch (error) { 
    throw error;
  }
}

const getAuthHeader = (authHeader: string): string => {
  if (authHeader === null || typeof authHeader === 'undefined') {
    return null;
  }

  const split = authHeader.split(' ');
  if (split.length == 2) {
    return authHeader.split(' ')[1];
  }

  return null;
}

export default {
  login,
  validateToken,
  getAuthHeader
};