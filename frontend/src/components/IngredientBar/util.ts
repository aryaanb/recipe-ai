export const postIngredients = async (ingredients: string[]) => {
  const url = '/api/recipeAssistant';
  const data = {
    ingredients: ingredients.join(', '),
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
    // Do something with responseData if needed
  } catch (error) {
    throw error;
  }
};
