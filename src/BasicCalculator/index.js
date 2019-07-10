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

import { IconCalculatorLine } from '@instructure/ui-icons/lib/IconCalculatorLine'
import { ScreenReaderContent } from '@instructure/ui-a11y/lib/ScreenReaderContent'
import { Button } from '@instructure/ui-buttons/lib/Button'
import CalculatorButton from './components/CalculatorButton'
import CalculatorDisplayText from './components/CalculatorDisplayText'
import { Grid } from '@instructure/ui-layout/lib/Grid'
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
    console.log("need to add " + displaySymbol + " to display")
    console.log("need to add " + hiddenSymbol + " to internal representation")
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

  renderClearAndDisplay() {
    return (
      <Flex.Item
        padding="xxx-small"
      >
        <Flex direction="row">
            <CalculatorButton
              fluidWidth
              displaySymbol="C"
              hiddenSymbol="C"
              clickFunction={this.clearDisplay}
            />
          <Flex.Item
            size="75%"
          >
            <CalculatorDisplayText
              displayText={this.state.displayString}
            />
          </Flex.Item>
        </Flex>
      </Flex.Item>
    )
  }

  renderRow1() {
    return (
      <Flex.Item
        padding="xxx-small"
      >
        <Flex direction="row">
          <CalculatorButton
            fluidWidth
            displaySymbol="7"
            hiddenSymbol="7"
            clickFunction={this.addSymbolToDisplay}
          />
          <CalculatorButton
            fluidWidth
            displaySymbol="8"
            hiddenSymbol="8"
            clickFunction={this.addSymbolToDisplay}
          />
          <CalculatorButton
            fluidWidth
            displaySymbol="9"
            hiddenSymbol="9"
            clickFunction={this.addSymbolToDisplay}
          />
          <CalculatorButton
            fluidWidth
            displaySymbol="÷"
            hiddenSymbol="/"
            clickFunction={this.addSymbolToDisplay}
          />
        </Flex>
      </Flex.Item>
    )
  }

  renderRow2() {
    return (
      <Flex.Item
        padding="xxx-small"
      >
        <Flex direction="row">
          <CalculatorButton
            fluidWidth
            displaySymbol="4"
            hiddenSymbol="4"
            clickFunction={this.addSymbolToDisplay}
          />
          <CalculatorButton
            fluidWidth
            displaySymbol="5"
            hiddenSymbol="5"
            clickFunction={this.addSymbolToDisplay}
          />
          <CalculatorButton
            fluidWidth
            displaySymbol="6"
            hiddenSymbol="6"
            clickFunction={this.addSymbolToDisplay}
          />
          <CalculatorButton
            fluidWidth
            displaySymbol="×"
            hiddenSymbol="*"
            clickFunction={this.addSymbolToDisplay}
          />
        </Flex>
      </Flex.Item>
    )
  }

  renderRow3() {
    return (
      <Flex.Item
        padding="xxx-small"
      >
        <Flex direction="row">
          <CalculatorButton
            fluidWidth
            displaySymbol="1"
            hiddenSymbol="1"
            clickFunction={this.addSymbolToDisplay}
          />
          <CalculatorButton
            fluidWidth
            displaySymbol="2"
            hiddenSymbol="2"
            clickFunction={this.addSymbolToDisplay}
          />
          <CalculatorButton
            fluidWidth
            displaySymbol="3"
            hiddenSymbol="3"
            clickFunction={this.addSymbolToDisplay}
          />
          <CalculatorButton
            fluidWidth
            displaySymbol="-"
            hiddenSymbol="-"
            clickFunction={this.addSymbolToDisplay}
          />
        </Flex>
      </Flex.Item>
    )
  }

  renderRow4() {
    return (
      <Flex.Item
        padding="xxx-small"
      >
        <Flex direction="row">
          <CalculatorButton
            fluidWidth
            displaySymbol="0"
            hiddenSymbol="0"
            clickFunction={this.addSymbolToDisplay}
          />
          <CalculatorButton
            fluidWidth
            displaySymbol="."
            hiddenSymbol="."
            clickFunction={this.addSymbolToDisplay}
          />
          <CalculatorButton
            fluidWidth
            displaySymbol="="
            hiddenSymbol="="
            clickFunction={this.addSymbolToDisplay}
          />
          <CalculatorButton
            fluidWidth
            displaySymbol="+"
            hiddenSymbol="+"
            clickFunction={this.addSymbolToDisplay}
          />
        </Flex>
      </Flex.Item>
    )
  }

  render() {
    return (
      <Flex
        visualDebug
        height="300px"
        width="250px"
        direction="column"
      >
        {this.renderClearAndDisplay()}
        {this.renderRow1()}
        {this.renderRow2()}
        {this.renderRow3()}
        {this.renderRow4()}
        {/*
        <Grid.Row>
          <Grid.Col width={1}>
            <CalculatorButton
              fluidWidth
              displaySymbol="0"
              hiddenSymbol="0"
              clickFunction={this.addSymbolToDisplay}
            />
          </Grid.Col>
          <Grid.Col width={1}>
            <CalculatorButton
              fluidWidth
              displaySymbol="."
              hiddenSymbol="."
              clickFunction={this.addSymbolToDisplay}
            />
          </Grid.Col>
          <Grid.Col width={1}>
            <CalculatorButton
              fluidWidth
              displaySymbol="="
              hiddenSymbol="="
              clickFunction={this.evaluateDisplay}
            />
          </Grid.Col>
          <Grid.Col width={1}>
            <CalculatorButton
              fluidWidth
              displaySymbol="+"
              hiddenSymbol="+"
              clickFunction={this.addSymbolToDisplay}
            />
          </Grid.Col>
        </Grid.Row>*/}
      </Flex>
    )
  }
}