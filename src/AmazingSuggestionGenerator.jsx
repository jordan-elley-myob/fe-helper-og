import React from 'react';
import {TextArea} from "@myob/myob-widgets";
import DataProcessor from "./DataProcessor";

export default class AmazingSuggestionGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableColumns: 2,
            lines: [],
            textArea: '',
        };
    }

textInput = () => {
    return(<TextArea
        onChange={(event) => {this.setState({textArea: event.target.value})}}
        value={this.state.textArea || ''}
        name="default"
        label="Dynamic List Data- Label- Amount"
        rows={20}
        white-space='pre-wrap'
    />)
};

    render() {
        const text = this.textInput();
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Amazing Suggestion Generator</h1>
                </header>
                <body>
                    {text}
                    <DataProcessor textArea={this.state.textArea}/>
                </body>
            </div>
        );
    }
}
