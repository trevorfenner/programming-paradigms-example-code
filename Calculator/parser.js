"use strict";

// idiomatic JS = old style!
// Based on a code example by Peter Olson.

// The parser accepts the tokens that the lexer produced, and returns a parse tree.
// The approach taken is known as "operator-precedence parsing".
// This process has the following steps:
//
// 1. Associate every operational token with a "left binding power" (lbp),
//    and an operational function.
// 2. If the operator manipulates tokens to its left (such as "+"),
//    associate it with a "left denotative function" (ldf).
// 3. If the operator does not manipulate the tokens on its left (such as the unary "-"),
//    associate it with a "null denotative function" (ndf).
// 4. Identifiers and numbers also have a "ndf" function associated with them.


const parse = function (tokens) {
    let symbols = {}; // need a symbol table so that we don't record things twice.
    let index = 0; // A count of where we are on the incoming token stream

    const symbol = function (id, ndf, lbp, ldf) {
        let sym = symbols[id] || {}; // idiomatic JS
        symbols[id] = {
            lbp: sym.lbp || lbp,    // old style for assigning default values
            ndf: sym.ndf || ndf,
            ldf: sym.ldf || ldf
        };
    };

    const token = () => {
        // Take the token and turn it into a symbol
        let tok = tokens[index];
        let sym = Object.create(symbols[tok.type]); // prototype creation based on the content of symbols
        sym.type = tok.type;
        sym.value = tok.value;
        return sym;
    };

    const advance = () => {
        index++;
        token();
    };

    const expression = function (rbp) {
        let left, t = token();
        advance();
        if (!t.ndf) {
            throw "Unexpected token: " + t.type;
        }
        left = t.ndf(t);
        while (rbp < token().lbp) {
            t = token();
            advance();
            if (!t.ldf) {
                throw "Unexpected token: " + t.type;
            }
            left = t.ldf(left);
        }
        return left;
    };

    const infix = function (id, lbp, rbp, ldf) {
        rbp = rbp || lbp; // idiomatic JS
        symbol(id, null, lbp, ldf || function (left) {
            return {
                type: id,
                left: left,
                right: expression(rbp)
            };
        });
    };
    const prefix = function (id, rbp) {
        symbol(id, function () {
            return {
                type: id,
                right: expression(rbp)
            };
        });
    };

    // body of the function

    // idiomatic JS uses nesting of functions to reduce exposing them and cluttering the namespace

    // load up the initial symbol table

    symbol(",");
    symbol(")");
    symbol("(end)");

    symbol("number", (number) => number);

    symbol("identifier", function (name) {
        if (token().type === "(") {
            let args = [];
            if (tokens[index + 1].type === ")") {
                advance();
            } else {
                do {
                    advance();
                    args.push(expression(2));
                } while (token().type === ",");
                if (token().type !== ")") {
                    throw "Expected closing parenthesis ')'";
                }
            }
            advance();
            return {
                type: "call",
                args: args,
                name: name.value
            };
        }
        return name;
    });

    symbol("(", function () {
        let value = expression(2);
        if (token().type !== ")") {
            throw "Expected closing parenthesis ')'";
        }
        advance();
        return value;
    });

    // operator precedence for some of the operators

    prefix("-", 7);
    infix("^", 6, 5);
    infix("*", 4);
    infix("/", 4);
    infix("%", 4);
    infix("+", 3);
    infix("-", 3);

    infix("=", 1, 2, function (left) {
        switch (left.type) {
            case "call":
                let item;
                for (item of left.args) {
                    if (item.type !== "identifier") throw "Invalid argument name";
                }
                return {
                    type: "function",
                    name: left.name,
                    args: left.args,
                    value: expression(2)
                };
                break;
            case "identifier":
                return {
                    type: "assign",
                    name: left.value,
                    value: expression(2)
                };
                break;
            default:
                throw "Invalid lvalue";
        }
    });

    // the main execution sequence
    
    let parseTree = [];
    // console.log(symbols); // If you wish to see what the initial symbol table look like uncomment this line
    while (token().type !== "(end)") { // operator precedence parser rather than recursive descent
        parseTree.push(expression(0));
    }
    return parseTree;
};

exports.parse = parse;