#lang racket
(require scheme/mpair)
(define pr '(a b 34))
(define mpr (mlist 'p 'q 67))

(set-mcar! mpr "cat")

;;; variadic functions

(define last (lambda x (final x)))

(define (final ls)
    (if (null? (cdr ls))
        (car ls)
        (final (cdr ls))))


(define sumsquare (lambda x (foldr + 0 (map square x))))

(define (square x) (* x x))

(sumsquare 3 4)

(define (variadic f)(lambda x (f x)))
;;;((lambda x (f x)) 1 2 3) => (f '(1 2 3))
(define (singlelistarg f) (lambda (x) (apply f x)))
;;; (apply f '(4 5 6)) => (f 4 5 6)
(define sum (singlelistarg +))
(define var-rev (variadic reverse))
;;; (var-rev 1 2 3 4) => (4 3 2 1)
