package hof

fun main() {
// Kotlin provides higher-order functions for working with collections.
    val z = (1..9).map { it * 3 }
        .filter { it < 20 }
        .groupBy { it % 2 == 0 }
    println(z) // {false=[3, 9, 15], true=[6, 12, 18]}
    println(z.mapKeys { if (it.key) "even" else "odd" }) // => {odd=[3, 9, 15], even=[6, 12, 18]}

}