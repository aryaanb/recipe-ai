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
		http.Error(w, "Error connecting to database: "+err.Error(), http.StatusInternalServerError)
		return
	}
	err = insertUser(db.Conn, body)
	if err != nil {
		http.Error(
			w,
			"Failed to insert user into database: "+err.Error(),
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

func insertUser(db *sql.DB, user contracts.User) error {
	var emailExists bool
	err := db.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE email = ?)", user.Email).
		Scan(&emailExists)
	if err != nil {
		return err
	}
	if emailExists {
		return nil
	}
	query := "INSERT INTO users (email) VALUES (?)"
	_, err = db.Exec(query, user.Email)
	if err != nil {
		return err
	}
	return nil
}
