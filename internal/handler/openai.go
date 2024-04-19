package handler

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	openai "github.com/sashabaranov/go-openai"

	"recipe-ai/internal/constants"
	"recipe-ai/internal/contracts"
)

type RecipeAssistantHandler struct{}

func (h *RecipeAssistantHandler) MakeChatRequest(w http.ResponseWriter, r *http.Request) {
	log.Println("[RecipeAssistantHandler]: Entered func")
	var ingredients contracts.RecipeAssistantPostBody
	err := json.NewDecoder(r.Body).Decode(&ingredients)
	if err != nil {
		http.Error(w, "Error decoding JSON request body", http.StatusBadRequest)
		return
	}

	token := os.Getenv("OPENAI_SECRET_KEY")
	client := openai.NewClient(token)

	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			ResponseFormat: &openai.ChatCompletionResponseFormat{
				openai.ChatCompletionResponseFormatTypeJSONObject,
			},
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleSystem,
					Content: constants.RecipeAssistantPrompt,
				},
				{
					Role:    openai.ChatMessageRoleUser,
					Content: ingredients.Ingredients,
				},
			},
		},
	)
	if err != nil {
		log.Printf("ChatCompletion error: %v\n", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Println(resp.Choices[0].Message.Content)
	var response contracts.RecipeAssistantResponse
	err = json.Unmarshal([]byte(resp.Choices[0].Message.Content), &response)
	if err != nil {
		http.Error(w, "Error reading assistant generated json", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(response)
}
