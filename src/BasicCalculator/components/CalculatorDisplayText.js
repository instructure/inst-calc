import React from 'react'

class CalculatorDisplayText extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <p>
                {this.props.displayText}
            </p>
        )
    }
}

export default CalculatorDisplayText