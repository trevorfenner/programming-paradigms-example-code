(define (mystery lst)
  (filter (lambda (x) (not (empty? x))) 
        (map (lambda (x) (if (eq? (car x) (car (cdr x))) (car x) '()))   
             (zip lst (cdr lst)))))

(define (zip ls1 ls2)
  (cond [(null? ls1) '()]
        [(null? ls2) '()]
        (else
         (cons (list (car ls1) (car ls2))
               (zip (cdr ls1) (cdr ls2))))))
