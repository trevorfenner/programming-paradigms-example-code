#lang racket
(define (zip x y)
  (if (or (null? x) (null? y))
      '()
      (cons (list (car x) (car y))
            (zip (cdr x) (cdr y)))))

(define (pairs z)
  (if (or (null? z) (null?( cdr z)))
      '()
      (cons (list (car z) (cadr z))
            (pairs (cdr z)))))

(define (pairs2 w) (zip w (cdr w)))

;(pairs '(1 2 3 4)) => '((1 2)(2 3)(3 4))

(define (monotonicinc x)
  (if (or (null? x) (null? (cdr x)))
      #t
      (and (< (car x) (cadr x))
           (monotonicinc (cdr x)))))

;(monotonicinc '(3 5 9 23)) => #t
;(monotonic '(3 5 9 23 6 35)) => #f


  