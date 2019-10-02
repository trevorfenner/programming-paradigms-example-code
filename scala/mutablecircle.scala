/**
 * A simple mutable circle with a center point and a radius.
 */
class MutableCircle(private var x: Double, private var y: Double, private var radius: Double) {

  def center = (x, y)

  def area = math.Pi * radius * radius

  def perimeter = 2.0 * math.Pi * radius

  def move(dx: Double, dy: Double) = {
    x += dx
    y += dy
    this
  }

  def expand(factor: Double) = {
    radius *= factor
    this
  }

  override def toString = "MutableCircle at (" + x + "," + y + ") with radius " + radius
}