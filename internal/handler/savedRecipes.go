package handler

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"recipe-ai/internal/contracts"
	"recipe-ai/internal/database"
)

type SavedRecipesHandler struct{}

func (s *SavedRecipesHandler) InsertRecipe(w http.ResponseWriter, r *http.Request) {
	var body contracts.SavedRecipe
	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		http.Error(w, "Error decoding JSON request body", http.StatusBadRequest)
		return
	}
	db, err := database.New()
	if err != nil {
		http.Error(w, "Error connecting to database: "+err.Error(), http.StatusInternalServerError)
		return
	}
	err = insertSavedRecipe(db.Conn, body)
	if err != nil {
		http.Error(
			w,
			"Failed to insert recipe into database: "+err.Error(),
			http.StatusInternalServerError,
		)
	}
	w.WriteHeader(http.StatusCreated)
	err = json.NewEncoder(w).Encode(body)
	if err != nil {
		http.Error(w, "Error encoding JSON"+err.Error(), http.StatusInternalServerError)
		return
	}
}

func insertSavedRecipe(db *sql.DB, recipe contracts.SavedRecipe) error {
	query := "INSERT INTO savedRecipes (recipeName, ingredients, instructions, userEmail) VALUES (?, ?, ?, ?)"
	_, err := db.Exec(
		query,
		recipe.RecipeName,
		recipe.Ingredients,
		recipe.Instructions,
		recipe.UserEmail,
	)
	if err != nil {
		return err
	}
	return nil
}

func (s *SavedRecipesHandler) GetAllUserRecipes(w http.ResponseWriter, r *http.Request) {
	params := r.URL.Query()
	userEmail := params.Get("email")
	if userEmail == "" {
		http.Error(w, "Missing required query parameter: email", http.StatusBadRequest)
	}
	db, err := database.New()
	if err != nil {
		http.Error(w, "Error connecting to database: "+err.Error(), http.StatusInternalServerError)
		return
	}
	recipes, err := getAllUserRecipes(db.Conn, userEmail)
	if err != nil {
		http.Error(
			w,
			"Failed to get saved recipes from database: "+err.Error(),
			http.StatusInternalServerError,
		)
	}
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(recipes)
	if err != nil {
		http.Error(w, "Error encoding JSON"+err.Error(), http.StatusInternalServerError)
		return
	}
}

func getAllUserRecipes(db *sql.DB, userEmail string) ([]contracts.SavedRecipe, error) {
	query := "SELECT recipeName, instructions, ingredients FROM savedRecipes WHERE userEmail = ?"
	rows, err := db.Query(query, userEmail)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var recipes []contracts.SavedRecipe
	for rows.Next() {
		var recipe contracts.SavedRecipe
		err = rows.Scan(&recipe.RecipeName, &recipe.Instructions, &recipe.Ingredients)
		if err != nil {
			return nil, err
		}
		recipes = append(recipes, recipe)
	}
	err = rows.Err()
	if err != nil {
		return nil, err
	}
	return recipes, nil
}
