"use strict";

const lex = require("./lexer")
const parser = require("./parser")
const evaluator = require("./evaluator")

const str = "(12 + 4) / 6";

let tokens = lex.lex(str);
console.log(tokens);
let tree = parser.parse(tokens)
console.log(tree);
let output = evaluator.evaluate(tree);
console.log(output);
