export function evaluate(expression) {
    console.log("evaluate(" + expression + ")")
    let parseTree = parse(expression)
    console.log(parseTree)
    return parseTree.evaluate()
}

function PEMDASParseExponents(expression, char, class_) {
    // stacked exponents are evaluated from top to bottom
    // in a^b^c, (b^c) is evaluated before (a^b)

    let last_ch = expression.indexOf(char)
    let expr_before_split = expression.slice(0, last_ch)
    let expr_after_split = expression.slice(last_ch + 1, expression.length)

    console.log(expr_before_split)
    console.log(expr_after_split)

    return new class_(parse(expr_before_split), parse(expr_after_split))
}

function PEMDASParseTwoInOne(expression, char1, char2, class1, class2) {
    // see note in parse() function
    
    let last_ch1 = expression.lastIndexOf(char1)
    let last_ch2 = expression.lastIndexOf(char2)

    let split_location = last_ch1 > last_ch2 ? last_ch1 : last_ch2
    let split_char = last_ch1 > last_ch2 ? char1 : char2

    let expr_before_split = expression.slice(0, split_location)
    let expr_after_split = expression.slice(split_location + 1, expression.length)

    console.log(expr_before_split)
    console.log(expr_after_split)

    if (split_char === char1) {
        return new class1(parse(expr_before_split), parse(expr_after_split))
    }
    else { // split_char === char2
        return new class2(parse(expr_before_split), parse(expr_after_split))
    }
}

function parse(expression) {
    console.log("parse(" + expression + ")")

    // Because we are constructing a parse tree from the inside out,
    // we have to go in reverse order of what is intuitive based on PEMDAS.
    // Therefore, we parse from right to left and with addition/subtraction
    // before multiplication/division, etc.

    if (expression.includes('+') || expression.includes('-')) { // go left to right for addition and subtraction
        return PEMDASParseTwoInOne(expression, '+', '-', AdditionObject, SubtractionObject)
    }
    else if (expression.includes('*') || expression.includes('/')) { // go left to right for multiplication and division
        return PEMDASParseTwoInOne(expression, '*', '/', MultiplicationObject, DivisionObject)
    }
    else if (expression.includes('^')) { // now parse for exponents
        return PEMDASParseExponents(expression, '^', ExponentObject)
    }

    // otherwise return the string as is
    else {
        return expression
    }
}

function add(left, right) {
    return left + right
}

function sub(left, right) {
    return left - right
}

function mul(left, right) {
    return left * right
}

function div(left, right) {
    return left / right
}

function exp(left, right) {
    return Math.pow(left, right)
}

class BinaryArithmeticObject {
    constructor(left, right, func) {
        if (isNaN(left)) {
            this.left = left
        }
        else {
            this.left = Number(left)
        }
        if (isNaN(right)) {
            this.right = right
        }
        else {
            this.right = Number(right)
        }
        this.func = func
    }

    evaluate() {
        if (isNaN(this.left)) {
            this.left = this.left.evaluate()
        }
        if (isNaN(this.right)) {
            this.right = this.right.evaluate()
        }
        return this.func(this.left, this.right)
    }
}

class AdditionObject extends BinaryArithmeticObject {
    constructor(left, right) {
        super(left, right, add)
    }
}

class SubtractionObject extends BinaryArithmeticObject {
    constructor(left, right) {
        super(left, right, sub)
    }
}

class MultiplicationObject extends BinaryArithmeticObject {
    constructor(left, right) {
        super(left, right, mul)
    }
}

class DivisionObject extends BinaryArithmeticObject {
    constructor(left, right) {
        super(left, right, div)
    }
}

class ExponentObject extends BinaryArithmeticObject {
    constructor(left, right) {
        super(left, right, exp)
    }
}