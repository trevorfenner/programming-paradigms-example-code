#lang racket

(define (reverse x)
  (if (null? x)
      '()
      (append (reverse (cdr x)) (list  (car x)))))

(define (reverse2 x res)
  (if (null? x)
      res
      (reverse2 (cdr x) (cons (car x) res))))

(define (newrev x)  (reverse2 x '()))

(define (dreverse x)
  (cond ((null? x) '())
        ((not (pair? x)) x)
        (else (append (dreverse (cdr x))
                      (list (dreverse(car x)))))))

;(reverse '(a b c d e f))
;(reverse '(a b (c d) e f))
(newrev '(a b (c d) e f))
(dreverse '(a b (c d) e f))