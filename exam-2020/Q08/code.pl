findnth([R|T], R, T).
findnth([H|X], N, X):- N1 = N-1, findnth(_,N1,X).

subset([ ],_).
subset([_|X],Y) :- member(_,Y), subset(X,Y).
