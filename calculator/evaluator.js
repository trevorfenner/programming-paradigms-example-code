"use strict";

// "Walk" the parse tree to evaluate the expression

const evaluate = (parseTree) => {
    let operators = {
        "+": (a, b) => a + b,
        "-": (a, b) => (typeof b === "undefined") ? -a : a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
        "%": (a, b) => a % b,
        "^": (a, b) => Math.pow(a, b)
    }

    let constants = {
        pi: Math.PI,
        e: Math.E
    }

    const functions = { // straight translation to the inbuilt functions
        sin: Math.sin,
        cos: Math.cos,
        tan: Math.cos,
        asin: Math.asin,
        acos: Math.acos,
        atan: Math.atan,
        abs: Math.abs,
        round: Math.round,
        ceil: Math.ceil,
        floor: Math.floor,
        log: Math.log,
        exp: Math.exp,
        sqrt: Math.sqrt,
        max: Math.max,
        min: Math.min,
        random: Math.random
    };

    let args = {};

    const parseNode = (node) => {
        switch (node.type) {
            case "number":
                return node.value;
            case "identifier":
                let value = args.hasOwnProperty(node.value) ? args[node.value] : constants[node.value];
                if (typeof value === "undefined") {
                    throw node.value + " is undefined";
                }
                return value;
            case "assign":
                constants[node.name] = parseNode(node.value);
                break;
            case "call":
                for (let i = 0; i < node.args.length; i++) {
                    node.args[i] = parseNode(node.args[i]);
                }
                return functions[node.name].apply(null, node.args); // run the function with these arguments
            case "function":
                functions[node.name] = () => {
                    for (let i = 0; i < node.args.length; i++) {
                        args[node.args[i].value] = arguments[i];
                    }

                    let ret = parseNode(node.value);
                    args = {};
                    return ret;
                };
                break;
            default:
                if (operators[node.type]) {
                    if (node.left) {
                        return operators[node.type](parseNode(node.left), parseNode(node.right));
                    } else {
                        return operators[node.type](parseNode(node.right));
                    }
                } else {
                    throw "Illegal type";
                }
        }
    }

    let output = "";
    let item;
    for (item of parseTree) {
        let value = parseNode(item);
        if (typeof value !== "undefined")
            output += value + "\n";
    }
    return output;
}

exports.evaluate = evaluate;