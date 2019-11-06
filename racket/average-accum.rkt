#lang racket

(define (average x)
  (define (av x sum count)
    (if (null? x)
        (/ sum count)
        (av (cdr x) (+ (car x) sum) (+ 1 count))))
  (av x 0 0))


(average '(1 2 3 4))