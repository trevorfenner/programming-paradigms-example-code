#lang racket

;;; 3 functions that apply a list of functions to an argument and return the list of results

(define (applyall fnlist x)
  (map (lambda (fn) (fn x)) fnlist))

(define (applyallEval fnlist x)
  (map (lambda (fn) ((eval fn) x)) fnlist))

;;; need to create a namespace if applyallEv is used in the define window
(define (applyallEvalinNewNS fnlist x)
  (map (lambda (fn) ((eval fn (make-base-namespace)) x)) fnlist))  

;;;consider the following examples:

(applyall (list car cddr cadddr) '(1 2 3 4 5))

;;;the following won't work - why?
;(applyall '(car cddr cadddr) '(2 3 4 5 6))

;;;both of the following work in the REPL, but  not in the define window
;(applyallEval (list car cddr cadddr) '(3 4 5 6 7))
;(applyallEval '(car cddr cadddr) '(4 5 6 7 8))

;;;but they works OK if we make a new namespace
(applyallEvalinNewNS (list car cddr cadddr) '(6 7 8 9 10))
(applyallEvalinNewNS '(car cddr cadddr) '(5 6 7 8 9))


