"use strict"; // so that it does some checking on the variables and naming

// Old style "idiomatic" JS except for the lambda expressions which shorten the code considerably.

// Horrible code but is of a "old JS" style.

const lex = (input) => { // used some lambdas, even though this is not idiomatic (old style JS)
    const isOperator = (c) => /[+\-*\/\^%=(),]/.test(c);
    const isDigit = (c) => /[0-9]/.test(c);
    const isWhiteSpace = (c) => /\s/.test(c);
    const isIdentifier = (c) => typeof c === "string" && !isOperator(c) && !isDigit(c) && !isWhiteSpace(c);

    let tokens = [];
    let ch = 0;
    let index = 0;

    const advance = () => ch = input[++index]; // procedure rather than function!

    const addToken = (type, value) => // add an object
        tokens.push({
            type: type,
            value: value
        });

    // body of the "lex" function

    while (index < input.length) {
        ch = input[index];
        if (isWhiteSpace(ch)) {
            advance();
        } else if (isOperator(ch)) {
            addToken(ch);
            advance();
        } else if (isDigit(ch)) {
            let num = ch;
            while (isDigit(advance())) {
                num += ch;
            }
            if (ch === ".") {
                do {
                    num += ch;
                } while (isDigit(advance()));
            }
            num = parseFloat(num);
            if (!isFinite(num)) {
                throw "Number is too large or too small for a 64-bit double.";
            }
            addToken("number", num);
        } else if (isIdentifier(ch)) {
            let idn = ch;
            while (isIdentifier(advance())) {
                idn += ch;
            }
            addToken("identifier", idn);
        } else {
            throw "Unrecognized token.";
        }
    }
    addToken("(end)");
    return tokens;
};

exports.lex = lex;  // so that we can "include" the code elsewhere