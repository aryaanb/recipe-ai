import axios from 'axios';

export async function getRecipes(email: string) {
  const url = '/api/savedRecipes';
  const params = { email: email };
  const res = await axios.get(url, {
    params: params,
  });
  return res.data;
}
