typealias MultiSet = (Int) -> Int

fun emptyMultiSet(): MultiSet {
    return { y -> 0 }
}

fun singleton(x: Int): MultiSet {
    return { y -> if (y == x) 1 else 0 }
}

fun union(a: MultiSet, b: MultiSet): MultiSet {
    return { y -> a(y) + b(y) }
}

fun intersect(a: MultiSet, b: MultiSet): MultiSet {
    return { y -> minOf(a(y), b(y)) }
}

fun diff(a: MultiSet, b: MultiSet): MultiSet {
    return { y -> maxOf(a(y) - b(y), 0) }
}

