#lang racket

(define (remove-first s los) 
    (if (null? los)
        '()
        (if (eq? (car los) s)
            (cdr los)
            (cons (car los)
                  (remove-first s (cdr los))))))

(remove-first 'a '(a b c))
(remove-first 'b '(a b c))
(remove-first 'd '(a b c))
(remove-first 'a '())