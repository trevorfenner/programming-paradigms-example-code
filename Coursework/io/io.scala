import java.io.{File,FileInputStream,FileOutputStream}
import scala.language.postfixOps

object IO {
  def main(args: Array[String]): Unit = {
	val src = new File("input.txt")
	val dest = new File("output.txt")
	new FileOutputStream(dest).getChannel().transferFrom(
    	new FileInputStream(src).getChannel, 0, Long.MaxValue )
  }
}