package main

import (
	"fmt"
)

func generateMessages(ch chan string, n int) {
	for i := 0; i < n; i++ {
		ch <- fmt.Sprintf("Hello: %3d", i)
	}
	close(ch)
}

func main() {
	messages := make(chan string, 5)
	go generateMessages(messages, 100)
	for message := range messages {
		fmt.Println(message)
	}
}
