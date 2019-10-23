"use strict";

// "Walk" the parse tree to evaluate the expression

const evaluate = function (parseTree) {
    let operators = {
            "+": (a, b) => a + b,
            "-": function (a, b) {
                if (typeof b === "undefined") return -a;
                return a - b;
            },
            "*": (a, b) => a * b,
            "/": (a, b) => a / b,
            "%": (a, b) => a % b,
            "^": (a, b) => Math.pow(a, b)
        }
    ;

    let variables = {
        pi: Math.PI,
        e: Math.E
    };

    const functions = {
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

    const parseNode = function (node) {
        switch (node.type) {
            case "number":
                return node.value;
            case "identifier":
                let value = args.hasOwnProperty(node.value) ? args[node.value] : variables[node.value];
                if (typeof value === "undefined") throw node.value + " is undefined";
                return value;
            case "assign":
                variables[node.name] = parseNode(node.value);
                break;
            case "call":
                for (let i = 0; i < node.args.length; i++) node.args[i] = parseNode(node.args[i]);
                return functions[node.name].apply(null, node.args);
            case "function":
                functions[node.name] = function () {
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
                    if (node.left) return operators[node.type](parseNode(node.left), parseNode(node.right));
                    return operators[node.type](parseNode(node.right));
                } else
                    throw "Illegal type";
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