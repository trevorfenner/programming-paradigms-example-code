package fp

fun main() {
    val numbers = listOf(5, 2, 10, 4)

    val sum = numbers.reduce { sum, element -> sum + element }
    println(sum)
    val sum2 = numbers.reduce { sum, element -> sum * element }
    println(sum2)

    val sumDoubled = numbers.fold(0) { sum, element -> sum + element * 2 }
    println(sumDoubled)

    val sumDoubledReduce =
        numbers.reduce { sum, element -> sum + element * 2 }
    println(sumDoubledReduce)
}