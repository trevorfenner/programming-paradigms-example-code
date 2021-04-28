package recursion

fun inc(n: Int) = n + 1
fun dec(n: Int) = n - 1

// addition and subtraction only using inc and dec

fun add(a: Int, b: Int): Int {
    var x = a
    var y = b
    while(y != 0) {
        x = inc(x)
        y = dec(y)
    }
    return x
}

tailrec fun addalt(x: Int, y: Int): Int = if (y == 0) x else add(inc(x), dec(y))