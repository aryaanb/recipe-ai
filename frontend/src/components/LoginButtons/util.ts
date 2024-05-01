import axios from 'axios';

export const getGoogleUser = async (accessToken: string) => {
  let res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};
