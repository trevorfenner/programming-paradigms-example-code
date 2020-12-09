-- type String = [Char]

type Position = (Int,Int)

origin :: Position
origin = (0,0)

left :: Position -> Position
left (x,y) = (x-1,y)

type Pair a = (a,a)
mult :: Pair Int -> Int
mult (m,n) = m * n

copy :: a -> Pair a
copy x = (x,x)

-- type Tree = (Int,[Tree]) -- recursive types are not allowed.

type Boolean = Bool

data Answer = Yes | No | Unknown

answers :: [Answer]
answers = [Yes, No, Unknown]

myflip :: Answer -> Answer
myflip Yes       = No
myflip No        = Yes
myflip Unknown   = Unknown


data Shape  = Circle Float      -- Circle :: Float -> Shape
            | Rect Float Float  -- Rect :: Float -> Float -> Shape
            deriving (Show)

square :: Float -> Shape
square n = Rect n n

area :: Shape -> Float
area (Circle r) = pi * r^2
area (Rect x y) = x * y

data MyMaybe a = Nowt | Boxed a deriving (Show)

safediv :: Int -> Int -> MyMaybe Int
safediv _ 0 = Nowt
safediv m n = Boxed (m `div` n)
