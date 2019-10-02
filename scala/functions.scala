import java.util.Arrays

def addSeven(x: Int) = x + 7
def multiplier(n: Int) = (x: Int) => x * n
def timesFour = multiplier(4)
def twice(f: (Int) => Int, x: Int) = f(f(x))
var timesThree = (x: Int) => x * 3
val collatz = (n: Int) => if (n % 2 == 0) n / 2 else 3 * n + 1

println(addSeven(5));
println(timesFour(10));
println(timesThree(10));

var n = 27
var a: Array[Int] = Array(n)
while (n != 1) {
  n = collatz(n)
  a ++= Array(n)
}
println(Arrays.toString(a))
