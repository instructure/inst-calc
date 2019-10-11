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
import PropTypes from 'prop-types'
import { CloseButton } from '@instructure/ui-buttons'
import { Dialog } from '@instructure/ui-a11y'

export default class DraggableWrapper extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    children: PropTypes.node.isRequired,
    handleClose: PropTypes.func
  }

  static defaultProps = {
    handleClose () {},
    isOpen: false
  }

    // Stores x & y coordinates of the mouse pointer
    x_pos = 0
    y_pos = 0
    // Stores top, left values (edge) of the element
    x_elem = 0
    y_elem = 0
    // tracks the element being moved
    selected = null

    componentDidUpdate (prevProps) {
      if (prevProps.isOpen !== this.props.isOpen) {
        if (this.props.isOpen) {
          document.onmousemove = this.handleMouseMove
          document.onmouseup = this.handleMouseUp
        } else {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    }

    handleMouseUp = () => {
      this.selected = null
    }

    handleWrapperRef = (node) => {
      this.wrapper = node
    }

    handleMouseDown = (node) => {
      this.selected = this.wrapper
      this.x_elem = this.x_pos - this.selected.offsetLeft
      this.y_elem = this.y_pos - this.selected.offsetTop
    }

    handleMouseMove = (e) => {
      this.x_pos = document.all ? window.event.clientX : e.pageX
      this.y_pos = document.all ? window.event.clientY : e.pageY
      if (this.selected != null) {
        this.selected.style.left = (this.x_pos - this.x_elem) + 'px'
        this.selected.style.top = (this.y_pos - this.y_elem) + 'px'
      }
    }

    render () {
      return (
        <Dialog
          shouldContainFocus
          open={this.props.isOpen}
        >
          <div
            ref={this.handleWrapperRef}
            style={{
              position: 'absolute',
              backgroundColor: '#F5F5F5',
              zIndex: 9999,
              width: 'max-content',
              border: '5px solid #2D3B45',
              top: '0',
              left: '0',
              display: this.props.isOpen ? 'block' : 'none'
            }}
          >
            <div
              role="presentation"
              onMouseDown={this.handleMouseDown}
              style={{
                height: '30px',
                backgroundColor: '#2D3B45',
                cursor: 'move'
              }}
            >
              <CloseButton
                variant="icon-inverse"
                placement="end"
                offset="none"
                onClick={this.props.handleClose}
              >
                Close
              </CloseButton>
            </div>
            {this.props.children}
          </div>
        </Dialog>
      )
    }
}
