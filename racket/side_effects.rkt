#lang racket
;SIDE EFFECTS
(define a 9)
;> a
;9
;> (* 2 (begin (display "cat")
;              (set! a 44)
;              (newline)
;              (display "dog")
;              (newline)
;              a))