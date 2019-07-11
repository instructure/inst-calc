/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { Component } from 'react'
import { evaluate } from 'mathjs'

import { Flex } from '@instructure/ui-layout/lib/Flex'
import { AccessibleContent } from '@instructure/ui-a11y/lib/AccessibleContent'

import CalculatorDisplayText from '../components/CalculatorDisplayText'
import CalculatorButton from '../components/CalculatorButton'

export default class Scientific extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayString: '',
      hiddenString: '',
      is2ndTurnedOn: 0
    }
  }

  toggle2nd = () => {
    this.setState({
      is2ndTurnedOn: !this.state.is2ndTurnedOn
    })
  }

  addSymbolToDisplay = (displaySymbol, hiddenSymbol) => {
    if (this.state.hiddenString === "Error" || this.state.displayString === "Error") {
      this.setState({
        displayString: '' + displaySymbol,
        hiddenString: '' + hiddenSymbol
      })
    }
    else {
      this.setState({
        displayString: this.state.displayString + displaySymbol,
        hiddenString: this.state.hiddenString + hiddenSymbol
      })
    }
  }

  clearDisplay = () => {
    this.setState({
      displayString: '',
      hiddenString: ''
    })
  }

  backspaceDisplay = () => {
    if (this.state.displayString.length > 0) {
      this.setState({
        displayString: this.state.displayString.slice(0, -1),
        hiddenString: this.state.hiddenString.slice(0, 1)
      })
    }
  }

  evaluateDisplay = () => {
    // TODO: automatically close unclosed parentheses
    // for example: "sqrt(4" should be transformed to
    // "sqrt(4)" before evaluation

    let result = evaluate(this.state.hiddenString).toString()
    if (result === "NaN" || result === "Infinity") {
      result = "Error"
    }
    this.setState({
      displayString: result.toString(),
      hiddenString: result.toString()
    })
  }

  renderCalcButton (button, display, value, screenreader, cb, width = 1) {
    const buttonWidth = (80 * width) + 'px'
    return (
      <Flex.Item
        width={buttonWidth}
        padding="xxx-small"
      >
        <AccessibleContent alt={screenreader}>
          <CalculatorButton
            buttonSymbol={button}
            displaySymbol={display}
            hiddenSymbol={value}
            clickFunction={cb}
          >
              {display}
          </CalculatorButton>
        </AccessibleContent>
      </Flex.Item>
    )
  }

  renderDisplay = () => (
    <Flex.Item
      grow
      textAlign="end"
      padding="small"
      overflowX="auto"
    >
      <CalculatorDisplayText
        displayText={this.state.displayString}
      />
    </Flex.Item>
  )

  renderRow1 = () => (
    <Flex.Item
      padding="xxx-small"
    >
      <Flex direction="row">
        {this.renderCalcButton("Rad/Deg", "Rad/Deg", "Rad/Deg", "Radians or degrees", Function.prototype, 2)}
        {this.renderCalcButton("MC", "MC", "MC", "MC", Function.prototype)}
        {this.renderCalcButton("MR", "MR", "MR", "MR", Function.prototype)}
        {this.renderCalcButton("M+", "M+", "M+", "M plus", Function.prototype)}
        {this.renderCalcButton("M-", "M-", "M-", "M minus", Function.prototype)}
        {this.renderCalcButton("CE", "CE", "CE", "CE", Function.prototype)}
        {this.renderCalcButton("Clear", "Clear", "Clear", "Clear", this.clearDisplay, 2)}
      </Flex>
    </Flex.Item>
  )

  renderRow2 = () => (
    <Flex.Item
      padding="xxx-small"
    >
      <Flex direction="row">
        {this.renderCalcButton("2nd", "2nd", "2nd", "Second", this.toggle2nd)}
        {this.renderCalcButton("%", "%", "%", "Percent", this.addSymbolToDisplay)}
        {this.renderCalcButton("EE", "*10^(", "*10^(", "times ten to the power of", this.addSymbolToDisplay)}
        {this.renderCalcButton("e", "e", "e", "e", this.addSymbolToDisplay)}
        {this.renderCalcButton("ln", "ln(", "ln(", "ln", this.addSymbolToDisplay)}
        {this.renderCalcButton("(", "(", "(", "(", this.addSymbolToDisplay)}
        {this.renderCalcButton(")", ")", ")", ")", this.addSymbolToDisplay)}
        {this.renderCalcButton("+/-", "+/-", "+/-", "plus slash minus", Function.prototype)}
        {this.renderCalcButton("Del", "Del", "Del", "backspace", this.backspaceDisplay)}
      </Flex>
    </Flex.Item>
  )

  renderRow3 = () => (
    <Flex.Item
      padding="xxx-small"
    >
      <Flex direction="row">
        {this.renderCalcButton("nPr", "nPr", "nPr", "number of permutations", Function.prototype)}
        {this.renderCalcButton("nCr", "nCr", "nCr", "number of combinations", Function.prototype)}
        {this.renderCalcButton("x!", "!", "!", "factorial", this.addSymbolToDisplay)}
        {this.renderCalcButton("π", "π", "pi", "pi", this.addSymbolToDisplay)}
        {this.renderCalcButton("log(10)", "log(", "log(", "log base ten", this.addSymbolToDisplay)}
        {this.renderCalcButton("7", "7", "7", "7", this.addSymbolToDisplay)}
        {this.renderCalcButton("8", "8", "8", "8", this.addSymbolToDisplay)}
        {this.renderCalcButton("9", "9", "9", "9", this.addSymbolToDisplay)}
        {this.renderCalcButton("÷", "÷", "/", "÷", this.addSymbolToDisplay)}
      </Flex>
    </Flex.Item>
  )

  renderRow4 = () => (
    <Flex.Item
      padding="xxx-small"
    >
      <Flex direction="row">
        {this.renderCalcButton("sin", "sin(", "sin(", "sine", this.addSymbolToDisplay)}
        {this.renderCalcButton("sec", "sec(", "sec(", "secant", this.addSymbolToDisplay)}
        {this.renderCalcButton("sinh", "sinh(", "sinh(", "hyperbolic sine", this.addSymbolToDisplay)}
        {this.renderCalcButton("1/x", "^(-1)", "^(-1)", "inverse", this.addSymbolToDisplay)}
        {this.renderCalcButton("log(n)", "log(n)", "log(n)", "log base n", Function.prototype)}
        {this.renderCalcButton("4", "4", "4", "4", this.addSymbolToDisplay)}
        {this.renderCalcButton("5", "5", "5", "5", this.addSymbolToDisplay)}
        {this.renderCalcButton("6", "6", "6", "6", this.addSymbolToDisplay)}
        {this.renderCalcButton("×", "×", "*", "×", this.addSymbolToDisplay)}
      </Flex>
    </Flex.Item>
  )

  renderRow5 = () => (
    <Flex.Item
      padding="xxx-small"
    >
      <Flex direction="row">
        {this.renderCalcButton("cos", "cos(", "cos(", "cosine", this.addSymbolToDisplay)}
        {this.renderCalcButton("csc", "csc(", "csc(", "cosecant", this.addSymbolToDisplay)}
        {this.renderCalcButton("cosh", "cosh(", "cosh(", "hyperbolic cosine", this.addSymbolToDisplay)}
        {this.renderCalcButton("√(x)", "sqrt(", "sqrt(", "square root", this.addSymbolToDisplay)}
        {this.renderCalcButton("x^2", "^2", "^2", "squared", this.addSymbolToDisplay)}
        {this.renderCalcButton("1", "1", "1", "1", this.addSymbolToDisplay)}
        {this.renderCalcButton("2", "2", "2", "2", this.addSymbolToDisplay)}
        {this.renderCalcButton("3", "3", "3", "3", this.addSymbolToDisplay)}
        {this.renderCalcButton("-", "-", "-", "minus", this.addSymbolToDisplay)}
      </Flex>
    </Flex.Item>
  )

  renderRow6 = () => (
    <Flex.Item
      padding="xxx-small"
    >
      <Flex direction="row">
        {this.renderCalcButton("tan", "tan(", "tan(", "tangent", this.addSymbolToDisplay)}
        {this.renderCalcButton("cot", "cot(", "cot(", "cotangent", this.addSymbolToDisplay)}
        {this.renderCalcButton("tanh", "tanh(", "tanh(", "hyperbolic tangent", this.addSymbolToDisplay)}
        {this.renderCalcButton("n√(x)", "nrt", "nrt", "nth root", Function.prototype)}
        {this.renderCalcButton("x^n", "^", "^", "to the power of", this.addSymbolToDisplay)}
        {this.renderCalcButton("0", "0", "0", "0", this.addSymbolToDisplay)}
        {this.renderCalcButton(".", ".", ".", ".", this.addSymbolToDisplay)}
        {this.renderCalcButton("=", "=", "=", "equals", this.evaluateDisplay)}
        {this.renderCalcButton("+", "+", "+", "plus", this.addSymbolToDisplay)}
      </Flex>
    </Flex.Item>
  )

  render2ndRow3 = () => (
    <Flex.Item
      padding="xxx-small"
    >
      <Flex direction="row">
        {this.renderCalcButton("nPr", "nPr", "nPr", "number of permutations", Function.prototype)}
        {this.renderCalcButton("nCr", "nCr", "nCr", "number of combinations", Function.prototype)}
        {this.renderCalcButton("x!", "!", "!", "factorial", this.addSymbolToDisplay)}
        {this.renderCalcButton("π", "π", "pi", "pi", this.addSymbolToDisplay)}
        {this.renderCalcButton("log(2)", "log(", "log(", "log base two", Function.prototype)}
        {this.renderCalcButton("7", "7", "7", "7", this.addSymbolToDisplay)}
        {this.renderCalcButton("8", "8", "8", "8", this.addSymbolToDisplay)}
        {this.renderCalcButton("9", "9", "9", "9", this.addSymbolToDisplay)}
        {this.renderCalcButton("÷", "÷", "/", "÷", this.addSymbolToDisplay)}
      </Flex>
    </Flex.Item>
  )

  render2ndRow4 = () => (
    <Flex.Item
      padding="xxx-small"
    >
      <Flex direction="row">
        {this.renderCalcButton(<span>sin<sup>-1</sup></span>, "arcsin(", "asin(", "inverse sine", this.addSymbolToDisplay)}
        {this.renderCalcButton(<span>sec<sup>-1</sup></span>, "arcsec(", "asec(", "inverse secant", this.addSymbolToDisplay)}
        {this.renderCalcButton(<span>sinh<sup>-1</sup></span>, "arcsinh(", "asinh(", "inverse hyperbolic sine",this.addSymbolToDisplay)}
        {this.renderCalcButton("i", "i", "i", "i", this.addSymbolToDisplay)}
        {this.renderCalcButton("log(n)", "log(n)", "log(n)", "log base n", Function.prototype)}
        {this.renderCalcButton("4", "4", "4", "4", this.addSymbolToDisplay)}
        {this.renderCalcButton("5", "5", "5", "5", this.addSymbolToDisplay)}
        {this.renderCalcButton("6", "6", "6", "6", this.addSymbolToDisplay)}
        {this.renderCalcButton("×", "×", "*", "×", this.addSymbolToDisplay)}
      </Flex>
    </Flex.Item>
  )

  render2ndRow5 = () => (
    <Flex.Item
      padding="xxx-small"
    >
      <Flex direction="row">
        {this.renderCalcButton(<span>cos<sup>-1</sup></span>, "arccos(", "acos(", "inverse cosine", this.addSymbolToDisplay)}
        {this.renderCalcButton(<span>csc<sup>-1</sup></span>, "arccsc(", "acsc(", "inverse cosecant", this.addSymbolToDisplay)}
        {this.renderCalcButton(<span>cosh<sup>-1</sup></span>, "arccosh(", "acosh(", "inverse hyperbolic cosine", this.addSymbolToDisplay)}
        {this.renderCalcButton("3√(x)", "cbrt(", "cbrt(", "cube root",  this.addSymbolToDisplay)}
        {this.renderCalcButton("x^2", "^2", "^2", "squared", this.addSymbolToDisplay)}
        {this.renderCalcButton("1", "1", "1", "1", this.addSymbolToDisplay)}
        {this.renderCalcButton("2", "2", "2", "2", this.addSymbolToDisplay)}
        {this.renderCalcButton("3", "3", "3", "3", this.addSymbolToDisplay)}
        {this.renderCalcButton("-", "-", "-", "minus", this.addSymbolToDisplay)}
      </Flex>
    </Flex.Item>
  )

  render2ndRow6 = () => (
    <Flex.Item
      padding="xxx-small"
    >
      <Flex direction="row">
        {this.renderCalcButton(<span>tan<sup>-1</sup></span>, "arctan(", "atan(", "inverse tangent", this.addSymbolToDisplay)}
        {this.renderCalcButton(<span>cot<sup>-1</sup></span>, "arccot(", "acot(", "inverse cotangent", this.addSymbolToDisplay)}
        {this.renderCalcButton(<span>tanh<sup>-1</sup></span>, "arctanh(", "atanh(", "inverse hyperbolic tangent", this.addSymbolToDisplay)}
        {this.renderCalcButton("n√(x)", "nrt", "nrt", "nth root", Function.prototype)}
        {this.renderCalcButton("x^n", "^", "^", "to the power of", this.addSymbolToDisplay)}
        {this.renderCalcButton("0", "0", "0", "0", this.addSymbolToDisplay)}
        {this.renderCalcButton(".", ".", ".", ".", this.addSymbolToDisplay)}
        {this.renderCalcButton("=", "=", "=", "equals", this.evaluateDisplay)}
        {this.renderCalcButton("+", "+", "+", "plus", this.addSymbolToDisplay)}
      </Flex>
    </Flex.Item>
  )

  render () {
    let calculatorToDisplay = ''
    if (!this.state.is2ndTurnedOn) { // 2nd is OFF
      calculatorToDisplay =
        <Flex
          // visualDebug
          height="400px"
          width="800px"
          direction="column"
        >
          {this.renderDisplay()}
          {this.renderRow1()}
          {this.renderRow2()}
          {this.renderRow3()}
          {this.renderRow4()}
          {this.renderRow5()}
          {this.renderRow6()}
        </Flex>
    }
    else { // 2nd is ON
      calculatorToDisplay =
        <Flex
          // visualDebug
          height="400px"
          width="800px"
          direction="column"
        >
          {this.renderDisplay()}
          {this.renderRow1()}
          {this.renderRow2()}
          {this.render2ndRow3()}
          {this.render2ndRow4()}
          {this.render2ndRow5()}
          {this.render2ndRow6()}
        </Flex>
    }
    return (
      <div>
        {calculatorToDisplay}
      </div>
    )
  }
}