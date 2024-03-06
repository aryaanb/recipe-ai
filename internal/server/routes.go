package server

import (
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"recipe-ai/internal/handler"
)

func (s *Server) RegisterRoutes() http.Handler {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	r.Route("/api/recipeAssistant", loadRecipeAssistantRoutes)
	wd, _ := os.Getwd()
	fs := http.FileServer(http.Dir(wd + "/frontend/build"))
	r.Handle("/*", fs)

	return r
}

func loadRecipeAssistantRoutes(router chi.Router) {
	recipeHandler := &handler.RecipeAssistantHandler{}
	router.Post("/", recipeHandler.MakeChatRequest)
}
