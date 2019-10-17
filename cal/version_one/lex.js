"use strict";

const lex = function (input) {
        let tokens = [];
        let ch = ""
        let i = 0;

        const isOperator = (c) => /[+\-*\/\^%=(),]/.test(c);

        const isDigit = (c) => /[0-9]/.test(c);

        const isWhiteSpace = (c) => /\s/.test(c);

        const isIdentifier = (c) =>
            typeof c === "string" &&
            !isOperator(c) &&
            !isDigit(c) &&
            !isWhiteSpace(c);

        const advance = () => input[i++];
        const addToken = (type, value) =>
            tokens.push({
                type: type,
                value: value
            });

        ch = advance()
        while (i < input.length) {
            if (isWhiteSpace(ch))
                ch = advance()
            else if (isOperator(ch)) {
                addToken("operator", ch);
                ch = advance()
            } else if (isDigit(ch)) {
                let num = ch;
                ch = advance()
                while (isDigit(ch)) {
                    num += ch;
                    ch = advance()
                }
                if (ch === ".") {
                    do {
                        num += ch;
                        ch = advance()
                    } while (isDigit(ch))
                }
                num = parseFloat(num);

                if (!isFinite(num))
                    throw "Number is too large or too small for a 64-bit double.";

                addToken("number", num);
            } else if (isIdentifier(ch)) {
                let idn = ch;
                ch = advance()
                while (isIdentifier(ch)) {
                    idn += ch;
                    ch = advance()
                }
                addToken("identifier", idn);
            } else {
                console.log("Unrecognized token.")
            }
        } // while
        addToken("(end)"); // marker for the end of the token list
        return tokens
    }
;

const str = "(12 + 4) / 6";

console.log(lex(str));
