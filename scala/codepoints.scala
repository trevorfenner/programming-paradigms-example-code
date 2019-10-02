object CodepointComputer {

  def codepointsFor(s: String) = {
    s.toList.map(c => c.toInt)
  }

  def main(args: Array[String]) {
    if (args.isEmpty || args(0).trim.isEmpty) {
      println("Missing argument")
    } else {
      println(codepointsFor(args(0)))
    }
  }
}