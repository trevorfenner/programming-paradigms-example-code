minimum_element([Min],Min).
minimum_element([Min|Tail], Min):- 
	minimum_element(Tail,TailMin), 
	Min =< TailMin.
minimum_element([H|Tail],Min):- 
	minimum_element(Tail,Min), 
	Min < H.