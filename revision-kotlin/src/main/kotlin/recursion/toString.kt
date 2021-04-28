package corecursion

fun append(s: String, c: Char): String = "$s$c"

fun toString(list: List<Char>, s: String): String =
    if (list.isEmpty())
        s
    else
        toString(list.drop(1), append(s, list.first()))

fun toString(list: List<Char>): String {
    fun toString(list: List<Char>, s: String): String =
        if (list.isEmpty())
            s
        else
            toString(list.subList(1, list.size), append(s, list[0]))
    return toString(list, "")
}

fun toStringdef(list: List<Char>, s: String = ""): String =
    if (list.isEmpty())
        s
    else
        toStringdef(list.subList(1, list.size), append(s, list[0]))

