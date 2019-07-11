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

import { Flex } from '@instructure/ui-layout/lib/Flex'

import CalculatorDisplayText from '../components/CalculatorDisplayText'
import CalculatorButton from '../components/CalculatorButton'

export default class Scientific extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayString: 'hello world',
      hiddenString: ''
    }
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

  evaluateDisplay = () => {
    let result = evaluate(this.state.hiddenString).toString()
    if (result === "NaN" || result === "Infinity") {
      result = "Error"
    }
    this.setState({
      displayString: result.toString(),
      hiddenString: result.toString()
    })
  }

  renderCalcButton (display, value, cb, width = 1) {
    const buttonWidth = (60 * width) + 'px'
    return (
      <Flex.Item
        width={buttonWidth}
        padding="xxx-small"
      >
        <CalculatorButton
          displaySymbol={display}
          hiddenSymbol={value}
          clickFunction={cb}
        >
          {display}
        </CalculatorButton>
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
        {this.renderCalcButton("Rad/Deg", "Rad/Deg", Function.prototype, 2)}
        {this.renderCalcButton("MC", "MC", Function.prototype)}
        {this.renderCalcButton("MR", "MR", Function.prototype)}
        {this.renderCalcButton("M+", "M+", Function.prototype)}
        {this.renderCalcButton("M-", "M-", Function.prototype)}
        {this.renderCalcButton("CE", "CE", Function.prototype)}
        {this.renderCalcButton("Clear", "Clear", Function.prototype, 2)}
      </Flex>
    </Flex.Item>
  )

  renderRow2 = () => (
    <Flex.Item
      padding="xxx-small"
    >
      <Flex direction="row">
        {this.renderCalcButton("alt", "alt", Function.prototype)}
        {this.renderCalcButton("%", "%", Function.prototype)}
        {this.renderCalcButton("EE", "EE", Function.prototype)}
        {this.renderCalcButton("e", "e", Function.prototype)}
        {this.renderCalcButton("ln", "ln", Function.prototype)}
        {this.renderCalcButton("(", "(", Function.prototype)}
        {this.renderCalcButton(")", ")", Function.prototype)}
        {this.renderCalcButton("+/-", "+/-", Function.prototype)}
        {this.renderCalcButton("Del", "Del", Function.prototype)}
      </Flex>
    </Flex.Item>
  )

  renderRow3 = () => (
    <Flex.Item
      padding="xxx-small"
    >
      <Flex direction="row">
        {this.renderCalcButton("nPr", "nPr", Function.prototype)}
        {this.renderCalcButton("nCr", "nCr", Function.prototype)}
        {this.renderCalcButton("x!", "x!", Function.prototype)}
        {this.renderCalcButton("pi", "pi", Function.prototype)}
        {this.renderCalcButton("log(10)", "log(10)", Function.prototype)}
        {this.renderCalcButton("7", "7", this.addSymbolToDisplay)}
        {this.renderCalcButton("8", "8", this.addSymbolToDisplay)}
        {this.renderCalcButton("9", "9", this.addSymbolToDisplay)}
        {this.renderCalcButton("÷", "/", this.addSymbolToDisplay)}
      </Flex>
    </Flex.Item>
  )

  renderRow4 = () => (
    <Flex.Item
      padding="xxx-small"
    >
      <Flex direction="row">
        {this.renderCalcButton("sin", "sin", Function.prototype)}
        {this.renderCalcButton("sec", "sec", Function.prototype)}
        {this.renderCalcButton("sinh", "sinh", Function.prototype)}
        {this.renderCalcButton("1/x", "1/x", Function.prototype)}
        {this.renderCalcButton("log(n)", "log(n)", Function.prototype)}
        {this.renderCalcButton("4", "4", this.addSymbolToDisplay)}
        {this.renderCalcButton("5", "5", this.addSymbolToDisplay)}
        {this.renderCalcButton("6", "6", this.addSymbolToDisplay)}
        {this.renderCalcButton("×", "*", this.addSymbolToDisplay)}
      </Flex>
    </Flex.Item>
  )
  
  renderRow5 = () => (
    <Flex.Item
      padding="xxx-small"
    >
      <Flex direction="row">
        {this.renderCalcButton("cos", "cos", Function.prototype)}
        {this.renderCalcButton("csc", "csc", Function.prototype)}
        {this.renderCalcButton("cosh", "cosh", Function.prototype)}
        {this.renderCalcButton("sqrt", "sqrt", Function.prototype)}
        {this.renderCalcButton("x^2", "x^2", Function.prototype)}
        {this.renderCalcButton("1", "1", this.addSymbolToDisplay)}
        {this.renderCalcButton("2", "2", this.addSymbolToDisplay)}
        {this.renderCalcButton("3", "3", this.addSymbolToDisplay)}
        {this.renderCalcButton("-", "-", this.addSymbolToDisplay)}
      </Flex>
    </Flex.Item>
  )

  renderRow6 = () => (
    <Flex.Item
      padding="xxx-small"
    >
      <Flex direction="row">
        {this.renderCalcButton("tan", "tan", Function.prototype)}
        {this.renderCalcButton("cot", "cot", Function.prototype)}
        {this.renderCalcButton("tanh", "tanh", Function.prototype)}
        {this.renderCalcButton("nrt", "nrt", Function.prototype)}
        {this.renderCalcButton("x^n", "x^n", Function.prototype)}
        {this.renderCalcButton("0", "0", this.addSymbolToDisplay)}
        {this.renderCalcButton(".", ".", this.addSymbolToDisplay)}
        {this.renderCalcButton("=", "=", this.addSymbolToDisplay)}
        {this.renderCalcButton("+", "+", this.addSymbolToDisplay)}
      </Flex>
    </Flex.Item>
  )

  render = () => (
    <Flex
      visualDebug
      height="400px"
      width="545px"
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
  )
}