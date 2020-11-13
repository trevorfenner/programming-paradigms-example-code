#lang racket

(define (reverse x)
  (if (null? x)
      '()
      (append (reverse (cdr x)) (list  (car x)))))

(define (reverseTR x)  (rev x '()))

(define (rev-help x res)
  (if (null? x)
      res
      (rev-help (cdr x) (cons (car x) res))))

(define (revnums n)      ;the same as (range n 0 -1)
  (if (= n 0)
      '()
      (cons n (revnums (- n 1)))))

;the following calls show the advantage of using tail recursion
;(length (reverseTR (revnums 30000)))
;(length (reverse (revnums 30000)))

(define (dreverse x)
  (cond ((null? x) '())
        ((not (pair? x)) x)
        (else (append (dreverse (cdr x))
                      (list (dreverse(car x)))))))

;(reverse '(a b c d e f))
;(reverse '(a b (c d) e f))
;(reverseTR '(a b (c d) e f))
;(dreverse '(a b (c d) e f))
