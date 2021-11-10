#lang racket
(print "start")
(newline)
;;(eval '(cons 5 6))
(eval '(cons 5 6) (make-base-namespace))
(define a 7)
(eval(+ 4 a) (make-base-namespace))
(eval a (make-base-namespace))
;;(eval 'a (make-base-namespace))
;;(eval a)
;;(eval a (make-base-namespace))
;;(eval 'a)

