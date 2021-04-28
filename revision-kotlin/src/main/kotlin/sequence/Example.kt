package sequence

// An example of using a sequence to generate Fibonacci numbers:
fun fibonacciSequence(): Sequence<Long> {
    var a = 0L
    var b = 1L

    fun next(): Long {
        val result = a + b
        a = b
        b = result
        return a
    }

    return generateSequence(::next)
}

fun main() {
    val y = fibonacciSequence().take(10).toList()
    println(y) // => [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
}