let lex = input => {
    let isOperator = ch => /[+\-*\/\^%=(),]/.test(ch),
        isDigit = ch => /[0-9]/.test(ch),
        isWhiteSpace = ch => /\s/.test(ch),
        isIdentifier = ch => typeof ch === "string" && !isOperator(ch) && !isDigit(ch) && !isWhiteSpace(ch);

    let tokens = [], ch, index = 0;
    let advance = () => ch = input[++index];
    let addToken = (type, value) => {
        tokens.push({
            type: type,
            value: value
        });
    };
    while (index < input.length) {
        ch = input[index];
        if (isWhiteSpace(ch)) {
            advance();
        } else if (isOperator(ch)) {
            addToken(ch);
            advance();
        } else if (isDigit(ch)) {
            let num = ch;
            while (isDigit(advance())) num += ch;
            if (ch === ".") {
                do num += ch; while (isDigit(advance()));
            }
            num = parseFloat(num);
            if (!isFinite(num)) {
                throw "Number is too large or too small for a 64-bit double.";
            }
            addToken("number", num);
        } else if (isIdentifier(ch)) {
            let ident = ch;
            while (isIdentifier(advance())) {
                ident += ch;
            }
            addToken("identifier", ident);
        } else {
            throw "Unrecognized token.";
        }
    }
    addToken("(end)");
    return tokens;
};

exports.lex = lex;
