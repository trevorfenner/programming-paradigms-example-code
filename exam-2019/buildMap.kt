import java.util.HashMap

fun usage(): Map<Int, String> {
    return buildMap {
        for (i in 0..10) {
            put(i, "$i")
        }
    }
}

fun <K, V> buildMap(build: HashMap<K, V>.() -> Unit): Map<K, V> {
    val map = HashMap<K, V>()
    map.build()
    return map
}

fun main(args: Array<String>) {
    println(usage())
}