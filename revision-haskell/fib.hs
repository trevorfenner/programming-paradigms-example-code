-- Pattern matching is similar. Here we have given three different
-- equations that define fib. Haskell will automatically use the first
-- equation whose left hand side pattern matches the value.
fib 1 = 1
fib 2 = 2
fib x = fib (x - 1) + fib (x - 2)