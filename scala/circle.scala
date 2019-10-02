/**
 * A simple immutable circle with a center point and a radius.
 */
class Circle(x: Double, y: Double, radius: Double) {
  def center = (x, y)
  def area = math.Pi * radius * radius
  def perimeter = 2.0 * math.Pi * radius
  def move(dx: Double, dy: Double) = new Circle(x + dx, y + dy, radius)
  def expand(factor: Double) = new Circle(x, y, radius * factor)
  override def toString = "Circle at (" + x + "," + y + ") with radius " + radius
}