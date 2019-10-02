// Print a greeting for the one whose name is given as the first commandline argument.

print("Hello");
if (args.isEmpty || args(0).trim.isEmpty) {
  println
} else {
  println(", " + args(0))
}