import axios from 'axios';
import config from '../config';

interface User {
  id: string,
  username: string,
  name: string,
  email: string
  sex: string,
  campus: string,
  faculty: string,
}

const mainInstance = axios.create({
  baseURL: config.mainApiUrl,
});

const getUser = async (token: string): Promise<User> => {
  try {
    const response = await mainInstance.get('/users/my-account', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'content-type': 'application/json',
      }
    });

    if (response.status !== 200) {
      throw new Error('Failed to retieve user data');
    }

    const data = response.data;
    if (data == null) {
      throw new Error('Failed to retieve user data');
    }

    const user: User = {
      id: data.id,
      username: data.username,
      name: data.name,
      email: data.email,
      sex: data.sex,
      campus: data.campus,
      faculty: data.faculty,
    }
  
    return user;
  } catch (error) {
    throw error;
  }
};

export default {getUser};