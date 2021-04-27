fun main(args: Array<String>) {
    println(factorial(6))
    println(factorialtail(6))
    val ls = listOf(1, 2, 3, 4, 5, 6)
    println(sumList(ls))
    val oddLength = compose(::isOdd, ::length)
    val strings = listOf("a", "ab", "abc")
    println(strings.filter(oddLength))
}

fun factorial(n: Int): Int = if (n <= 0) 1 else n * factorial(n - 1)

// (a)
fun factorialtail(n: Int): Int {
    tailrec fun factorialHelper(n: Int, acc: Int): Int =
        if (n <= 0) acc else factorialHelper(n - 1, acc * n)
    return factorialHelper(n, 1)
}

// (b)
fun sumList(ls: List<Int>): Int {
    tailrec fun sumListHelper(ls: List<Int>, acc: Int): Int =
        if (ls.isEmpty()) acc else sumListHelper(ls.drop(1), ls[0] + acc)
    return sumListHelper(ls, 0)
}

// (c)
fun flip(f: (Int, Double) -> Int): (Double, Int) -> Int {
    return { x, y -> f(y,x)}
}