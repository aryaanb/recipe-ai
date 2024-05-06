package database

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

type DB struct {
	Conn *sql.DB
}

var dbInstance *DB

const dbFile string = "./recipeai.db"

func New() (*DB, error) {
	if dbInstance != nil {
		return dbInstance, nil
	}
	client, err := sql.Open("sqlite3", dbFile)
	if err != nil {
		return nil, err
	}
	dbInstance := &DB{
		Conn: client,
	}
	return dbInstance, nil
}
