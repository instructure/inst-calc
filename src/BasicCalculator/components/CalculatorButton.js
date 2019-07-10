import React from 'react'
import { Button } from '@instructure/ui-buttons/lib/Button'

class CalculatorButton extends Button {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Button
                onClick={() => this.props.clickFunction(this.props.displaySymbol, this.props.hiddenSymbol)}
            >
                {this.props.displaySymbol}
            </Button>
        )
    }
}

export default CalculatorButton