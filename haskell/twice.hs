twice :: (a -> a) -> (a -> a)
twice f x = f (f x)

mymap :: (a -> b) -> [a] -> [b]
mymap f xs = [f x | x <- xs]

mymaprec f []      = []
mymaprec f (x:xs)  = f x : map f xs

myfilter :: (a -> Bool) -> [a] -> [a]
myfilter p xs = [x | x <- xs, p x]

myfilterrec p []    = []
myfilterrec p (x:xs)
       | p x        = x : filter p xs
       | otherwise  = filter p xs


-- f []       = v
-- f (x:xs)   = x op f xs

mysum []     = 0
mysum (x:xs) = x + mysum xs
