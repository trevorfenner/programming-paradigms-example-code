package main

import "fmt"

func sum(inputChannel chan int, inputChannelCount int, outputChannel chan int) {
	sum := 0
	for i := 0; i < inputChannelCount; i++ {
		sum += <-inputChannel
	}
	outputChannel <- sum
}

func dSumHelper(inputChannel chan int, outputChannel chan int, k int) {
	if inputChannel == nil || cap(inputChannel) == 0 {
		// nothing to sum, just feed a zero
		outputChannel <- 0
	} else if k == 0 || k >= cap(inputChannel) {
		// no "processors"
		// or doesn't worth the effort to distribute summing because number of "processors" > number of numbers to sum
		// just sum
		sum(inputChannel, cap(inputChannel), outputChannel)
	} else {
		// otherwise should distribute summing
		childrenOutputChannel := make(chan int, k) // output sums from current dSumHelper's "processors" to this channel
		for i := 0; i < k; i++ {
			// for each "processor"
			var childChannelCount = cap(inputChannel) / k // number of numbers to get from the input channel
			if i == k-1 {
				childChannelCount += cap(inputChannel) % k // fix remainder for the last "processor"
			}
			go sum(inputChannel, childChannelCount, childrenOutputChannel) // start the "processor" to sum the given number of numbers from the input channel
		}
		dSumHelper(childrenOutputChannel, outputChannel, k) // recursively call itself, using output sums from current dSumHelper's "processors" as the input channel
	}
}

// k is the number of "processors" (=goroutines) to distribute summing with
func dSum(arr []int, k int) int {
	inputChannel := make(chan int, len(arr)) // input all numbers to this channel
	outputChannel := make(chan int, 1)       // output the total sum from this channel
	for _, v := range arr {
		inputChannel <- v
	}
	dSumHelper(inputChannel, outputChannel, k)
	return <-outputChannel
}

func main() {
	array := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15}
	for k := 0; k < len(array)*2; k++ {
		fmt.Println(dSum(array, k))
	}
}