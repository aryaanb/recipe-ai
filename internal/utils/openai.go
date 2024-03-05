// for future use
package utils

import (
	"context"
	"log"

	openai "github.com/sashabaranov/go-openai"
)

func CreateAssistantFile(client *openai.Client, path string, name string) (openai.File, error) {
	file, err := client.CreateFile(context.Background(), openai.FileRequest{
		FileName: name,
		FilePath: path,
		Purpose:  "assistants",
	})
	if err != nil {
		log.Printf("[CreateAssistantFile: Error]: %v", err)
		return openai.File{}, err
	}
	return file, nil
}

func CreateAssistant(client *openai.Client, fileID string) (openai.Assistant, error) {
	name := "Recipe Book"
	description := "You are great at suggesting recipes given a list of ingredients"
	assistantTool := openai.AssistantTool{
		Type: "code_interpreter",
	}
	instructions := ""

	assistant, err := client.CreateAssistant(context.Background(), openai.AssistantRequest{
		Model:        openai.GPT3Dot5Turbo,
		Name:         &name,
		Description:  &description,
		Instructions: &instructions,
		Tools:        []openai.AssistantTool{assistantTool},
		FileIDs:      []string{fileID},
	})
	if err != nil {
		return openai.Assistant{}, err
	}
	return assistant, nil
}

// TODO
func CreateThread() {}

// TODO
func CreateRun() {}
