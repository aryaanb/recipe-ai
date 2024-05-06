package handler

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"recipe-ai/internal/contracts"
	"recipe-ai/internal/database"
)

type UserHandler struct{}

func (u *UserHandler) InsertUser(w http.ResponseWriter, r *http.Request) {
	var body contracts.User
	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		http.Error(w, "Error decoding JSON request body", http.StatusBadRequest)
		return
	}
	db, err := database.New()
	if err != nil {
		http.Error(w, "Error connecting to database", http.StatusInternalServerError)
		return
	}
	err = insertUser(db.Conn, body)
	if err != nil {
		http.Error(w, "Failed to insert user into database", http.StatusInternalServerError)
	}
	w.WriteHeader(http.StatusCreated)
	err = json.NewEncoder(w).Encode(body)
	if err != nil {
		http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
		return
	}
}

func insertUser(db *sql.DB, user contracts.User) error {
	return nil
}
