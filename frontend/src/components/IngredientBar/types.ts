export type Recipe = {
  ingredients: string[];
  instructions: string[];
  recipeName: string;
  recipeId?: number;
};

export type RecipePostBody = {
  ingredients: string[];
  assistantProfile: string;
};
