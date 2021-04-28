package fp

fun main() {
    val listA = listOf("a", "b", "c")
    val listB = listOf(1, 2, 3, 4)
    println(listA zip listB) // [(a, 1), (b, 2), (c, 3)]
}