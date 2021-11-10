#lang racket
;;;some alternative definitions to thoe in the slides
;;;car, cdr, etc. for streams
(define (scar s) (car (s)))
(define (scdr s) (cdr (s)))
(define (scaar s) (scar (scar s)))
(define (scdar s) (scdr (scar s)))
(define (scadr s) (scar (scdr s)))
(define (scddr s) (scdr (scdr s)))

(define (nth s n)   ;;nth element of a stream
  (if (= n 1) 
      (scar s)
      (nth (scdr s) (- n 1))))

(define (s+ s1 s2)  ;;add streams
  (lambda () (cons (+ (scar s1) (scar s2))
                   (s+ (scdr s1) (scdr s2)))))
(define (s* s1 s2)  ;;multiply streams
  (lambda () (cons (* (scar s1) (scar s2))
                   (s* (scdr s1) (scdr s2)))))

(define ones (lambda () (cons 1 ones)))
(define twos (s+ ones ones))
(define threes (s+ ones twos))
(define nats (lambda () (cons 1 (s+ ones nats))))
(define powersof2 (lambda () (cons 1 (s* twos powersof2))))
(define fibs
  (lambda () (cons 1 (lambda ()
                       (cons 1 (s+ fibs (scdr fibs)))))))

(define (integers-starting-from n)
  (lambda () (cons n (integers-starting-from (+ n 1)))))

(define integers (integers-starting-from 1))

(define altintegers (lambda() (cons 1 (s+ ones altintegers))))








