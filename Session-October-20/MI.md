	## Multiple Inheritance (MI)

+ Ruby only has single inheritance
  + achieves MI via the use of mixins

+ Java supports multiple inheritance
  + specification
  + implementation
  + they should be separate
  + interfaces are the specification
  + classes are the implementation mechanism
 
 ```
      Academic
    /         \
Student       Lecturer
    \           /
    Teaching Assistant
 ```
  Clashes in implementation lead to confusion in Java.

+ Other languages have alternative ways to "choose" between the implementations should there be a clash.
+ A class of specifications rarely (if ever) causes an issue.

If you have time (and the inclination), do take a look at `Scala` or `C#`.

