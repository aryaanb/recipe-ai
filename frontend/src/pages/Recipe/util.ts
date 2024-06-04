import axios from 'axios';
import { SavedRecipe } from '../../global/recipe.types';
export const saveRecipe = async (recipe: SavedRecipe) => {
  const url = '/api/savedRecipes';
  const res = await axios.post(url, recipe);
  return res.data;
};
