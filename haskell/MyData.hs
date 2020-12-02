data MetricUnit = Metre | Litre | Kilogram deriving (Show, Eq)

symbol :: MetricUnit -> String
symbol x
    | x == Metre    = "m"
    | x == Litre    = "L"
    | x == Kilogram = "kg"
