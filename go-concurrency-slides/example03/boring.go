package main

import (
    "fmt"
    "math/rand"
    "time"
)

func main() {
	fmt.Println("Starting a goroutine...")
    go boring("boring!")
    fmt.Println("I hope it ran...")
}

func boring(msg string) {
	fmt.Println("Starting up...")
    for i := 0; ; i++ {
        fmt.Println(msg, i)
        time.Sleep(time.Duration(rand.Intn(1e3)) * time.Millisecond)
    }
}