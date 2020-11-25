#lang racket
 (require racket/trace)
(define (sum xs)
  (if (null? xs)
      0
      (+ (car xs) (sum (cdr xs)))))

(define (sumLtoR xs)
  (if (null? xs)
      0
      (if (null?(cdr xs))
          (car xs)
          (sumLtoR (cons (+(car xs) (cadr xs)) (cddr xs))))))

(define (sumTR xs)
  (define (sum-acc xs res)
    (if (null? xs)
        res
        (sum-acc (cdr xs) (+ (car xs) res))))
  (sum-acc xs 0))

(define (sumTR2 xs)
  (sum-acc xs 0))

(define (sum-acc xs res)
    (if (null? xs)
        res
        (sum-acc (cdr xs) (+ (car xs) res))))

(trace sum  sumLtoR sumTR sumTR2 sum-acc)