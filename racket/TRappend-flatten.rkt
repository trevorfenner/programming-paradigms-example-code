#lang racket
(require racket/trace)

(define (my-flatten ls)
  (define (my-flattenTR lst res)
   (cond
    [(null? lst) res]
    [else (my-flattenTR (cdr lst) (appendTR res (car lst)))] ))
  (my-flattenTR ls '()))

(define (appendTR xs ys)
  (rev-help  (rev-help xs '()) ys))

(define (rev-help xs res)
  (if (null? xs) res (rev-help (cdr xs) (cons (car xs) res))))

(define (my-append xs ys)
  (if (null? xs) ys (cons (car xs) (my-append (cdr xs) ys))))

(define (my-reverse xs)
  (if (null? xs)
      '()
      (my-append (my-reverse (cdr xs)) (list (car  xs)))))

(trace my-flatten appendTR)
