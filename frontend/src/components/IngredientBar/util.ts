import { RecipePostBody } from './types';

export const postIngredients = async (recipeBody: RecipePostBody) => {
  const url = '/api/recipeAssistant';
  let { ingredients, assistantProfile } = recipeBody;
  const data = {
    ingredients: ingredients.join(', '),
    assistantProfile: assistantProfile,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};
