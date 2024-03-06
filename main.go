package main

import (
	"fmt"
	"log"

	"recipe-ai/internal/server"
)

func main() {
	server := server.NewServer()

	log.Printf("Starting server on port: %s\n", server.Addr)
	err := server.ListenAndServe()
	if err != nil {
		panic(fmt.Sprintf("cannot start server: %s", err))
	}
}
