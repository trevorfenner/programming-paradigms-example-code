plays(flagTwirlers, flags).
plays(plankton, keyboard).
plays(squidward, clarinet).
plays(patrick, mayo).
plays(patrick, drums).
plays(spongebob, drums).
plays(spongebob, spatula).

twoPlayers(X) :- plays(Y, X), plays(Z, X), Y \= Z.
talented(X) :- plays(X, Y), plays(X, Z), Y \= Z.

band1([], []).
band1([H|T], [X|Y]) :- talented(H), !, plays(H, X), band1(T, Y).

band2([], []).
band2([H|T], [X|Y]) :- plays(H, X), band2(T, Y), \+ member(H, T).