import {User} from '../models/User';
import {db} from '../database';

const userRepository = db.getRepository(User);

const getUsers = async () => {
  try {
    const users = await userRepository.find();
    return users;
  } catch (error) {
    return [];
  }
};

const validateToken = async (token: string): Promise<boolean>  => {
  try {
    return true;
  } catch (error) { 
    throw error;
  }
}

export default {
  getUsers,
  validateToken
};
