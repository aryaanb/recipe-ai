package main

import (
	"fmt"
	"log"

	"recipe-ai/internal/database"
	"recipe-ai/internal/server"
)

func main() {
	_, err := database.New()
	if err != nil {
		log.Fatal(err)
	}
	server := server.NewServer()

	log.Printf("Starting server on port: %s\n", server.Addr)
	err = server.ListenAndServe()
	if err != nil {
		panic(fmt.Sprintf("cannot start server: %s", err))
	}
}
