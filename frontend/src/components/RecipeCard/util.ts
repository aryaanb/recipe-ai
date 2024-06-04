import axios from 'axios';
export const deleteRecipe = (recipeId: number) => {
  const url = `/api/savedRecipes/${recipeId}`;
  return axios.delete(url);
};
