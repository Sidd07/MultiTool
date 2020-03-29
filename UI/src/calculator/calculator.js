
import React, { Component } from 'react';
import ResultComponent from './resultComponent';
import KeyPadComponent from "./KeyPadComponent";

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: ""
        }
    }

    action = (button) => {

        if (button === "=") {
            this.calculate();
        }

        else if (button === "C") {
            this.reset();
        }
        else if (button === "CE") {
            this.backspace();
        }

        else {
            this.setState({
                result: this.state.result + button
            })
        }
    };


    calculate = () => {
        var checkResult = ''
        if (this.state.result.includes('--')) {
            checkResult = this.state.result.replace('--', '+');
        }

        else {
            checkResult = this.state.result
        }

        try {
            let result = new Function('return ' + checkResult)();
            this.setState({
                result: (result || "") + ""
            });
        } catch (e) {
            this.setState({
                result: "error"
            });

        }
    };

    reset = () => {
        this.setState({
            result: ""
        });
    };

    backspace = () => {
        this.setState({
            result: this.state.result.slice(0, -1)
        });
    };


    render() {
        return (
            <div>
                <br />
                <center><h1>Hi, I'm Calculator!</h1></center>
                <br />
                <div className="calculator-body">
                    <ResultComponent result={this.state.result} />
                    <KeyPadComponent onClick={this.action} keys={['(', ')', 'CE', 'C', '1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '*', '.', '0', '=', '/']} />
                </div>
            </div>
        );
    }
}

export default Calculator;
