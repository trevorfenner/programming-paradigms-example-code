(define (fnc arg)
  (map
   (lambda (lst)
     (list (car lst)
           (cadr lst)
           (caddr lst)
           '==>
           (eval lst)))
   arg))