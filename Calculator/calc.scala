import scala.util.parsing.combinator._

trait Maths {
  def add(x: Float, y: Float) = x + y
  //
  def div(x: Float, y: Float) = if (y > 0) (x/y) else 0.f
}

class ReversePolishCalculator extends JavaTokenParsers with Maths {  // 3 4 / ... 3 4 5 +
  def expr: Parser[Float] = rep( term ~ operator) ^^ {
    case terms =>
      // each operand is placed on the stack
      // pairs will be "popped" for each operation, replaced by their result
      // computation stops when there is only one value left (no more operands to be evaluated)
      var stack = List.Empty[Float]
      // remembering the last operation we performed. If there isn't one, then we default to addition.
      var lastOp: (Float,Float) => add
      terms.foreach( t =>
        // perform a lookup (match) on the operator so that we perform the correct calculation
        t match {
          // add operands to stack, reduce using the current operator
          case nums ~ op => 
            lastOp = op
            stack = reduce (stack ++ nums, op)

        })
        // Apply the last operation to all the remaining operands
        // 3 4 5 6 + becomes 3 4 11 then 3 15 then 18 and then we stop
        stack.reduceRight((x,y) => lastOp(x,y))
  }
  // a term is a number of numbers (floats)
  def term: Parser[List[Float]] = rep(num)
  // A "structure" is either a number or another expression which we convert to a Float
  def structure: Parser[Float] = num | "(" ~> expr <~ ")" ^^ (_.toFloat) 
  def num: Parser[Float] = floatPointNumber ^^ (_.toFloat)
  // parse an operator and map to underlying function
  def operator: Parser[(Float, Float) => Float] = ("*" | "/" | "+" | "-") ^^ {
    case "+" => add
    case "-" => sub
    case "*" => mul
    case "/" => div
  }

  // reduces the stack by popping off the last pair, applying the relevant operator, 
  // and pushing the result back on the stack
  def reduce(nums: List[Float], op: (Float, Float) => Float): List[Float] = {
    val result = nums.reverse match { // had to reverse the list to allow the use of destructuring operators
      // at least two numbers
      case x :: y :: xs => xs ++ List(op(x,y))
      // one number
      case List(x) => List(x)
      // empty list
      case _ => List.empty[Float]
    }
    result
  }
}


/* trait JavaTokenParsers extends RegexParsers {
  def floatPointNumber: Parser[String] = {
    """-?(\d+(\.\d*)?|...."
  }
}*/

object Calculator extends ReversePolishCalculator {
  def main(args: Array[String]){
     println(s"input: $args(0)")
     println(s"result: $calculate(args(0))")
  }

  def calculate(expression: String) = parseAll(expr,expression)
}