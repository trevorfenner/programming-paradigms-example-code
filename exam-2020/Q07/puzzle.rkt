#lang racket

(define (puzzle x)
  (cond ((null? x) '())
        ((null? (cdr x)) '())
        (else (append (map(lambda (a)(list (car x) a)) (cdr x))
                      (puzzle (cdr x))))))

