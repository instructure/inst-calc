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

import CalculatorButton from './components/CalculatorButton'
import CalculatorDisplayText from './components/CalculatorDisplayText'
import { Flex } from '@instructure/ui-layout/lib/Flex'

// import PropTypes from 'prop-types'

export default class Basic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayString: '',
      hiddenString: ''
    }
    this.addSymbolToDisplay = this.addSymbolToDisplay.bind(this)
    this.clearDisplay = this.clearDisplay.bind(this)
    this.evaluateDisplay = this.evaluateDisplay.bind(this)
  }

  static propTypes = {

  }

  addSymbolToDisplay(displaySymbol, hiddenSymbol) {
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

  clearDisplay() {
    this.setState({
      displayString: '',
      hiddenString: ''
    })
  }

  evaluateDisplay() {
    let result = evaluate(this.state.hiddenString).toString()
    if (result === "NaN" || result === "Infinity") {
      result = "Error"
    }
    this.setState({
      displayString: result.toString(),
      hiddenString: result.toString()
    })
  }

  renderCalcButton(display, value, cb) {
    return (
      <Flex.Item
        width="48px"
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

  renderClearAndDisplay = () => (
    <Flex.Item
      padding="xxx-small"
    >
      <Flex direction="row">
        {this.renderCalcButton("C", "C", this.clearDisplay)}
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
      </Flex>
    </Flex.Item>
  )

  renderRow1 = () => (
    <Flex.Item
      padding="xxx-small"
    >
      <Flex direction="row">
        {this.renderCalcButton("7", "7", this.addSymbolToDisplay)}
        {this.renderCalcButton("8", "8", this.addSymbolToDisplay)}
        {this.renderCalcButton("9", "9", this.addSymbolToDisplay)}
        {this.renderCalcButton("÷", "/", this.addSymbolToDisplay)}
      </Flex>
    </Flex.Item>
  )

  renderRow2 = () => (
    <Flex.Item
      padding="xxx-small"
    >
      <Flex direction="row">
        {this.renderCalcButton("4", "4", this.addSymbolToDisplay)}
        {this.renderCalcButton("5", "5", this.addSymbolToDisplay)}
        {this.renderCalcButton("6", "6", this.addSymbolToDisplay)}
        {this.renderCalcButton("x", "*", this.addSymbolToDisplay)}
      </Flex>
    </Flex.Item>
  )

  renderRow3 = () => (
    <Flex.Item
      padding="xxx-small"
    >
      <Flex direction="row">
        {this.renderCalcButton("1", "1", this.addSymbolToDisplay)}
        {this.renderCalcButton("2", "2", this.addSymbolToDisplay)}
        {this.renderCalcButton("3", "3", this.addSymbolToDisplay)}
        {this.renderCalcButton("-", "-", this.addSymbolToDisplay)}
      </Flex>
    </Flex.Item>
  )

  renderRow4 = () => (
    <Flex.Item
      padding="xxx-small"
    >
      <Flex direction="row">
        {this.renderCalcButton("0", "0", this.addSymbolToDisplay)}
        {this.renderCalcButton(".", ".", this.addSymbolToDisplay)}
        {this.renderCalcButton("=", "=", this.evaluateDisplay)}
        {this.renderCalcButton("+", "+", this.addSymbolToDisplay)}
      </Flex>
    </Flex.Item>
  )

  render = () => (
    <Flex
      height="235px"
      width="200px"
      direction="column"
      overflowX="hidden"
    >
      {this.renderClearAndDisplay()}
      {this.renderRow1()}
      {this.renderRow2()}
      {this.renderRow3()}
      {this.renderRow4()}
    </Flex>
  )
}