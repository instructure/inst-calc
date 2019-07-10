import React from 'react'
import { Button } from '@instructure/ui-buttons/lib/Button'

class CalculatorButton extends Button {
    constructor(props) {
        super(props)
        this.addSymbolToDisplay = this.addSymbolToDisplay.bind(this)
    }

    addSymbolToDisplay(displaySymbol, hiddenSymbol) {
        console.log("need to add " + displaySymbol + " to display")
        console.log("need to add " + hiddenSymbol + " to internal representation")
    }

    render() {
        return (
            <Button
                onClick={() => this.addSymbolToDisplay(this.props.displaySymbol, this.props.hiddenSymbol)}
            >
                {this.props.displaySymbol}
            </Button>
        )
    }
}

export default CalculatorButton