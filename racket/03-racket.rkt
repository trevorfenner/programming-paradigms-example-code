#lang racket

;; Higher-Order Functions

;; examples to try:
;  (map null? '(3 () () 5))
;  (map round '(3.3 4.6 5.9)) 
;  (map cdr '((1 2) (3 4) (5 6)))
;  (map (lambda (x) (* 2 x)) '(3 4 5))
;  (filter (lambda (n) (> n 10)) '(5 10 15 20))

(define (add-n-to-list alist n)
  (map (lambda (x) (+ n x)) alist))
  
 (define (between low high numlist)
  (filter (lambda (n) (and (> n low) (< n high))) numlist))

;;Note that in the add-n-to-list function, the body of the lambda function
;; can refer to the variable n, which is in the lexical scope of the lambda
;; expression.

;; map can also be used with functions that take more than one argument.

;; to try:
;  (map + '(1 2 3) '(10 11 12))
;  (map (lambda (x y) (list x y)) '(a b c) '(j k l))

;; Defining higher order functions

(define (my-map f s)
  (if (null? s)
      '()
      (cons (f (car s)) (my-map f (cdr s)))))

;; return a new	list that consists of all elements of s	for which f is true
(define (my-filter f s)
  (cond ((null? s) '())
        ((f (car s)) (cons (car s) (my-filter f (cdr s))))
        (else (my-filter f (cdr s)))))
        
;;;Deep Recursion

(define (sumall x)
  (cond [(null? x) 0]
        [(pair? x) (+ (sumall (car x))
                      (sumall (cdr x)))]
        [else x]))

(define (reverse list)
  (if (null? list) empty
      (append (reverse (cdr list)) (cons (car list) empty))))

(define (deep-reverse lst)
  (cond [(null? lst) empty]
        [(not (pair? lst)) lst]
        [else (append (deep-reverse (cdr lst)) 
                      (list (deep-reverse (car lst))))]))
                      
;(reverse '(a b (c d) e f))
;(deep-reverse '(a b (c d) e f))                      
              
(define (flatten x)
  (if (null? x)
      '()
    (append (car x) (flatten (cdr x)))))
        
(define (deepflatten x)
  (cond [(null? x)'()]
        [(not (pair? x)) (list x)]
        [else (append (deepflatten (car x)) 
                      (deepflatten (cdr x)))]))

;;(deepflatten '(((((1 3)6)8)9)(a 10 b)))
;;(deepflatten '((a b) (c d)))

(define (count-leaves tree) (length (deepflatten tree)))

(define (accumulate op initial sequence) ;same as foldr
  (if (null? sequence)
      initial
      (op (car sequence)
          (accumulate op initial (cdr sequence)))))
          
;;;foldl is tail-recursive
(define (accumulateL  op initial sequence) ;same as foldl
  (accLeft op sequence initial))

(define (accLeft op sequence result)
  (if (null? sequence)
      result
      (accLeft op (cdr sequence) (op (car sequence) result))))

(define (map proc sequence)
  (accumulate 
   (lambda (x y) (cons (proc x) y))    
   empty sequence))
   
;;; define filter using accumulate   

(define (append s1 s2)
  (accumulate cons s2 s1))

(define (length sequence)
  (accumulate
   (lambda (x y) (+ 1 y))
   0 sequence))

(define (flatten-branch branch)
  (if (pair? branch) 
      (dflatten branch)
      (list branch)))

(define (dflatten tree)
  (accumulate append 
              empty 
              (map flatten-branch tree)))

(define (count-leaves tree) (length (flatten tree)))

(define (flatmap proc seq)
  (accumulate append empty (map proc seq)))

(define (permutations s)
  (if (null? s)                      ; empty set?
      (list empty)                   ; sequence containing empty set
      (flatmap (lambda (x)
                 (map (lambda (p) (cons x p))
                      (permutations (remove x s))))
               s)))
