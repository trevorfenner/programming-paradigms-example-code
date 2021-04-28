package tail

fun append(s: String, c: Char): String = "$s$c"

fun toStringTail(list: List<Char>): String {
    tailrec fun toString(list: List<Char>, s: String): String =
        if (list.isEmpty())
            s
        else
            toString(list.subList(1, list.size), append(s, list[0]))
    return toString(list, "")
}