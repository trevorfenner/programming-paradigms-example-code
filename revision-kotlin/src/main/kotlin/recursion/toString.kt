package recursion

fun append(s: String, c: Char): String = "$s$c"

fun toString(list: List<Char>, s: String): String =
    if (list.isEmpty())
        s
    else
        toString(list.drop(1), append(s, list.first()))

fun toStringOther(list: List<Char>): String {
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

fun main(){
    //println(append("String", 's'))
    println(toString(listOf('s','t','r','i','n','g'),""))
    println(toStringOther(listOf('s','t','r','i','n','g')))
    println(toStringdef(listOf('s','t','r','i','n','g')))
}

