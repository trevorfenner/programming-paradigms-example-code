package main

import (
	"fmt"
	"sync"
	"time"
)

var wg sync.WaitGroup

type Stack []Node

func (s *Stack) IsEmpty() bool {
	return len(*s) == 0
}
func (s *Stack)  Push(n *Node) {
	*s = append(*s, *n)
}

func (s *Stack) Pop() (*Node, bool) {
	if s.IsEmpty() {
		return nil, false
	} else {
		top := len(*s) - 1
		item := (*s)[top]
		*s = (*s)[:top]
		return &item, true
	}
}

type Node struct {
	Data int
	Left *Node
	Right *Node
}

func NewNode(data int) *Node {
	return &Node{data, nil, nil}
}

func (n *Node) Process() {
	//time.Sleep(2 * time.Second) // doing some time consuming things
	fmt.Print(n.Data, " ")
}

// In order
func DFRec(n *Node) {
	if n == nil {
		return
	}
	DFRec(n.Left)
	n.Process()
	DFRec(n.Right)
}

func DFRecImproved(n *Node){
	defer wg.Done()

	if n == nil {
		return
	}
	wg.Add(1)
	go DFRecImproved(n.Left)
	n.Process()
	wg.Add(1)
	go DFRecImproved(n.Right)
}

// In order
func DFS(n *Node) {
	s := Stack{}
	current := n
	for {
		if s.IsEmpty() && current == nil { return }
		if current != nil {
			s.Push(current)
			current = current.Left
		} else {
			current, _ = s.Pop()
			current.Process()
			current = current.Right
		}
	}
}

func main() {
	n := NewNode(1)
	n.Left = NewNode(2)
	n.Right = NewNode(3)
	n.Left.Left = NewNode(4)
	n.Left.Right = NewNode(5)
	n.Right.Left = NewNode(6)
	n.Right.Right = NewNode(7)
	n.Right.Right.Left = NewNode(8)

	start := time.Now()
	DFRec(n)
	fmt.Printf("took %v\n", time.Now().Sub(start))

	start = time.Now()
	wg.Add(1)
	go DFRecImproved(n)
	wg.Wait()

	fmt.Printf("took %v\n", time.Now().Sub(start))
}