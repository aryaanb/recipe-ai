import axios from 'axios';
import { User } from '../../global/user.types';

export const getGoogleUser = async (accessToken: string) => {
  let res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};

export const registerUser = async (user: User) => {
  const url = '/api/user';
  let res = await axios.post(url, user);
  return res.data;
};
