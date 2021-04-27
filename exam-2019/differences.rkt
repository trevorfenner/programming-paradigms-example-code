#lang racket

(define (total-error list_of_pairs)
  (foldl + 0 (map error_for list_of_pairs)))

(define (error_for two_list)
  (abs (- (car two_list)
          (cadr two_list))))

(total-error '((10 7) (2 9) (-5 -10)))