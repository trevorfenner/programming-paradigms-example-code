"use strict";

const lex = require("./lexer") // to "pull in", "include" the code
const parser = require("./parser")
const evaluator = require("./evaluator")

//const str = "(12 + 4) / 6"; // Test string

const str = "2 ^ 3 - 3";

// let tokens = lex.lex(str);
// console.log(tokens);

// let tree = parser.parse(tokens)
// console.log(tree);

// let output = evaluator.evaluate(tree);
// console.log(output);

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

console.log(calculate(str));