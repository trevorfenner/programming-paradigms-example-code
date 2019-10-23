"use strict";

// idiomatic JS = old style!

// The parser accepts the tokens that the lexer produced, and returns a parse tree.

const parse = function (tokens) {
    let symbols = {};
    let index = 0;

    const symbol = function (id, nud, lbp, led) {
        let sym = symbols[id] || {}; // idiomatic JS
        symbols[id] = {
            lbp: sym.lbp || lbp,
            nud: sym.nud || nud,
            led: sym.led || led
        };
    };

    const interpretToken = function (token) {
        let sym = Object.create(symbols[token.type]);
        sym.type = token.type;
        sym.value = token.value;
        return sym;
    };

    const token = () => interpretToken(tokens[index]);

    const advance = () => {
        index++;
        token();
    };

    const expression = function (rbp) {
        let left, t = token();
        advance();
        if (!t.nud) {
            throw "Unexpected token: " + t.type;
        }
        left = t.nud(t);
        while (rbp < token().lbp) {
            t = token();
            advance();
            if (!t.led) {
                throw "Unexpected token: " + t.type;
            }
            left = t.led(left);
        }
        return left;
    };

    const infix = function (id, lbp, rbp, led) {
        rbp = rbp || lbp; // idiomatic JS
        symbol(id, null, lbp, led || function (left) {
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

    let parseTree = [];
    while (token().type !== "(end)") {
        parseTree.push(expression(0));
    }
    return parseTree;
};

exports.parse = parse;