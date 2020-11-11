;;;lect5_A.rkt   also in 02 except ac-map, ac-filter, ac-flatten
#lang racket

(define (accum op init seq)
  (if (null? seq)
      init
      (op (car seq) (accum op init (cdr seq)))))

(define (app list1 list2)
  (accum cons list2 list1))

(define (len x)
  (accum (lambda (x y) (+ 1 y)) 0 x))

(define (flatten x)
  (if (null? x)
      '()
    (append (car x) (flatten (cdr x)))))

(define (ac-flatten x)
  (accum append '() x))

(define (ac-map f s)
  (accum (lambda (x y) (cons (f x) y))
         '()
         s))

(define (ac-filter f s)
  (accum (lambda (x y)(if (f x) (cons x y) y))
         '()
         s))

(define (add-n-to-list alist n)
  (ac-map (lambda (x) (+ n x)) alist))

(define (between low high numlist)
  (ac-filter (lambda (n) (and (> n low) (< n high))) numlist))
