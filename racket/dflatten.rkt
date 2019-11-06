#lang racket

(define (dflatten x)
  (cond [(null? x)'()]
        [(not (pair? x)) (list x)]
        [else
         (append (dflatten (car x))
                 (dflatten (cdr x)))]))

(dflatten '(((((1 3)6)8)9)(a 10 b)))
(dflatten '((a b) (c d)))