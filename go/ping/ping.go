package main

import (
	"fmt"
	"time"
)

func main() {

    messages := make(chan string)

    go func() { 
//    	fmt.Println("Pushing ping")
//		time.Sleep(2 * time.Second)
    	messages <- "ping" 
//		time.Sleep(2 * time.Second)
//    	fmt.Println("Pushed")
    }()

//    fmt.Println("Waiting for msg...")
    msg := <-messages
    fmt.Println(msg)
}