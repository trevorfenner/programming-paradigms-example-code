-- getChar :: IO Char
-- putChar :: Char -> IO ()
-- return  :: a -> IO a

act :: IO (Char, Char)
act = do  x <- getChar
          getChar
          y <- getChar
          return (x,y)

mygetLine :: IO String
mygetLine = do x <- getChar
               if x == '\n' then
                  return []
               else
                  do xs <- mygetLine
                     return (x:xs)

putString :: String -> IO ()
putString []     = return ()
putString (x:xs) = do putChar x
                      putString xs

putStringLn :: String -> IO ()
putStringLn str = do putString str
                     putChar '\n'
