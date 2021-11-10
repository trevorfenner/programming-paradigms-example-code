#lang racket
(require racket/trace)
(define ns (make-base-namespace))

(define (listarg->variadic f)(lambda x (f x)))
;;;((lambda x (f x)) 1 2 3) => (f '(1 2 3))
(define (variadic->listarg f) (lambda (x) (apply f x)))
;;; (apply f '(4 5 6)) => (f 4 5 6)
(define sum (variadic->listarg +))
(define var-rev (listarg->variadic reverse))

(define (sumL xs) (apply + xs))
;;((lambda (xs) (apply + xs))
(define (rev-var . args) (reverse args))
;;(lambda args (reverse args))

;(define (my-and-var . args) (my-andL args))

;(define (my-andL lst)
;  (if (null? lst) #t (and (car lst) (my-andL (cdr lst)))))

(define (my-andL lst)
  (apply my-and-var lst))

(define (my-and-var . args)
  (if (null? args)
      #t
     (and (car args) (my-andL (cdr args)))))

;;(trace my-and-var my-andL)


  


