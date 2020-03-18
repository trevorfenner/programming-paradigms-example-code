let parse = function (tokens) {
    let symbols = {},
        symbol = (id, nud, lbp, led) => {
            let sym = symbols[id] || {};
            symbols[id] = {
                lbp: sym.lbp || lbp,
                nud: sym.nud || nud,
                led: sym.lef || led
            };
        };

    let interpretToken = token => {
        let sym = Object.create(symbols[token.type]);
        sym.type = token.type;
        sym.value = token.value;
        return sym;
    };

    let i = 0, token = () => interpretToken(tokens[i]);
    let advance = () => {
        i++;
        return token();
    };

    let expression = rbp => {
        let left, token1 = token();
        advance();
        if (!token1.nud) {
            throw "Unexpected token: " + token1.type;
        }
        left = token1.nud(token1);
        while (rbp < token().lbp) {
            token1 = token();
            advance();
            if (!token1.led) {
                throw "Unexpected token: " + token1.type;
            }
            left = token1.led(left);
        }
        return left;
    };

    let infix = (id, lbp, rbp, led) => {
            rbp = rbp || lbp;
            symbol(id, null, lbp, led || function (left) {
                return {
                    type: id,
                    left: left,
                    right: expression(rbp)
                };
            });
        },
        prefix = (id, rbp) => {
            symbol(id, () => ({
                type: id,
                right: expression(rbp)
            }));
        };


    symbol(",");
    symbol(")");
    symbol("(end)");

    symbol("number", number => number);
    symbol("identifier", name => {
        if (token().type === "(") {
            let args = [];
            if (tokens[i + 1].type === ")") {
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

    symbol("(", () => {
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

    infix("=", 1, 2, left => {
        if (left.type === "call") {
            for (let i = 0; i < left.args.length; i++) {
                if (left.args[i].type !== "identifier") {
                    throw "Invalid argument name";
                }
            }
            return {
                type: "function",
                name: left.name,
                args: left.args,
                value: expression(2)
            };
        } else if (left.type === "identifier") {
            return {
                type: "assign",
                name: left.value,
                value: expression(2)
            };
        } else {
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
