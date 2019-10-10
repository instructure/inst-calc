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
import Basic from './BasicCalculator'
import Scientific from './ScientificCalculator'
import { Button } from '@instructure/ui-buttons'

import '@instructure/canvas-theme'

export default class App extends Component {
  state = {
    basicOpen: false,
    scientificOpen: false
  }

  openBasic = () => {
    this.setState({
      basicOpen: !this.state.basicOpen
    })
  }

  openScientific = () => {
    this.setState({
      scientificOpen: !this.state.scientificOpen
    })
  }

  render () {
    return (
      <div>
        <Button onClick={this.openBasic}>
          Basic Calculator Toggle
        </Button>
        <Basic isOpen={this.state.basicOpen}/>

        <Button onClick={this.openScientific}>
          Scientific Calculator Toggle
        </Button>
        <Scientific isOpen={this.state.scientificOpen} />
      </div>
    )
  }
}
