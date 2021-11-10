#lang racket
(define f1 (lambda (x y z) (+ x (* y z))))

(define f2 (lambda args
             (+ (car args) (* (cadr args) (caddr args)))))

(define f3 (lambda args
             (+ (car args) (eval (cons * (cdr args))))))

(define f4 (lambda args
             (+ (car args) (apply * (cdr args)))))

(define f5 (lambda (x . args)
             (+ x (eval (cons *  args)))))

(define f6 (lambda (x . args)
             (+ x (apply  *  args))))

;;;
(define (square x) (* x x))
(define mapsquare (lambda (xs) (map square xs)))
(define prod (lambda args (mapsquare args)))
(define mpsq (lambda (xs) (apply prod xs)))