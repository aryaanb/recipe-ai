package contracts

type RecipeAssistantPostBody struct {
	Ingredients string `json:"ingredients"`
}

type RecipeAssistantResponse struct {
	Instructions []string `json:"instructions"`
	Ingredients  []string `json:"ingredients"`
}
