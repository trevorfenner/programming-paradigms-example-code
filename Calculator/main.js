"use strict";

const lex = require("./lexer") // to "pull in", "include" the code
const parser = require("./parser")
const evaluator = require("./evaluator")

const str = `
3
2 ^ 8
(12 % 7) * (3 + 2)
19 / -9

hoursPerDay = 24
minutesPerHour = 60
minutesPerDay = minutesPerHour * hoursPerDay
minutesPerDay
minutesPerDay * 60

thing(x) = x * 2
thing(6)

toDegrees(radians) = radians * 180 / pi
toDegrees(2 * pi)

cylinderVolume(r, h) = pi * r ^ 2 * h
cylinderVolume(2, 4)`

let tokens = lex.lex(str);
console.log(tokens);

let tree = parser.parse(tokens)
console.log(tree);

let output = evaluator.evaluate(tree);
console.log(output);

const calculate = function (input) {
    try {
        let tokens = lex.lex(input);
        //console.log(tokens);
        let parseTree = parser.parse(tokens);
        //console.log(parseTree);
        let output = evaluator.evaluate(parseTree);
        return output;
    } catch (e) {
        return e;
    }
};

//console.log(calculate(str));
