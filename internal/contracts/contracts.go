package contracts

type RecipeAssistantPostBody struct {
	Ingredients      string `json:"ingredients"`
	AssistantProfile string `json:"assistantProfile"`
}

type RecipeAssistantResponse struct {
	Instructions []string `json:"instructions"`
	Ingredients  []string `json:"ingredients"`
	RecipeName   string   `json:"recipeName"`
}

type User struct {
	Email     string `json:"email"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
}

type SavedRecipe struct {
	Instructions []string `json:"instructions"`
	Ingredients  []string `json:"ingredients"`
	RecipeName   string   `json:"recipeName"`
	UserEmail    string   `json:"userEmail"`
	RecipeId     int      `json:"recipeId"`
}
