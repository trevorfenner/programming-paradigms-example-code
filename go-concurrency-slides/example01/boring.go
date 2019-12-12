package main

import (
	"fmt"
	"time"
)

func main(){
	boring("Hello world!")
}

func boring(msg string) {
    for i := 0; ; i++ {
        fmt.Println(msg, i)
        time.Sleep(time.Second)
    }
}
