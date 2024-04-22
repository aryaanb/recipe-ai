export type Recipe = {
  ingredients: string[];
  instructions: string[];
  recipeName: string;
};

export type RecipePostBody = {
  ingredients: string[];
  assistantProfile: string;
};
