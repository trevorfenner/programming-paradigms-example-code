#lang racket

(define (reverse x)
  (if (null? x)
      '()
      (append (reverse (cdr x)) (list  (car x)))))

(define (TRreverse x)
  (revhelp x '()))

(define (revhelp x res)
  (if (null? x)
      res
      (revhelp (cdr x) (cons (car x) res))))

(define (revnums n)
  (if (= n 0)
      '()
      (cons n (revnums (- n 1)))))
;;;(revnums n) is the same as (range n 0 -1)

;;;(take x k) is a list of the first k elements of the list x
(take (revnums 30000) 8)

;;;the following calls show the difference using tail recursion
(take (TRreverse (revnums 30000)) 8)
(take (reverse (revnums 30000)) 8)