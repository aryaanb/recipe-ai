export type Recipe = {
  ingredients: string[];
  instructions: string[];
  recipeName: string;
};

export type SavedRecipe = {
  ingredients: string[];
  instructions: string[];
  recipeName: string;
  userEmail: string;
};
