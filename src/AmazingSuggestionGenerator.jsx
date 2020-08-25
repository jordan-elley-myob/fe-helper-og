import React from 'react';
import {TextArea} from "@myob/myob-widgets";

export default class AmazingSuggestionGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableColumns: 2,
            lines: [],
            textArea: '',
        };
    }

 camelize = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
};

interpretation = (textRaw) => {
    const lines = textRaw.split("\n");
    return(<table border="1px">
        <tr>
            <th>label</th>
            <th>Source</th>
        </tr>
        <tr>
            <td>{lines[0]}</td>
            <td>{lines[1]}</td>
        </tr>
        <tr>
            <td>{lines[2]}</td>
            <td>{lines[3]}</td>
        </tr>
    </table>)
};

makeModel = (textRaw) => {
    const lines = textRaw.split("\n");
    const layoutChildren = [(<h2>Some Entry's for model which might be useful</h2>)];
    for (let i = 0; i < lines.length; i+=2) {
        const id = this.camelize(lines[i]);
        const child = (
            <div>
                <p>{id}: <br/>
                    type: number</p>
            </div>);
        layoutChildren.push(child)
    }
    layoutChildren.push(<h2>Other suggestions</h2>);
    for (let i = 1; i < lines.length; i+=2) {
        const id =lines[i];
        const child = (
            <div>
                <p>{id}: <br/>
                    type: number</p>
            </div>);
        layoutChildren.push(child)
    }
    layoutChildren.push(<h2>Source suggestions</h2>)

    for (let i = 1; i < lines.length; i+=2) {
        const id =lines[i];
        const child = (
            <div>
                <p>{id}: <br/>
                    source: forms/tax-forms-nz.*/{id}</p>
            </div>);
        layoutChildren.push(child)
    }

    return layoutChildren
};


makeLayout =(textRaw)=>{
    const lines = textRaw.split("\n");
    const layoutChildren = [(<h1>Layout Children</h1>)];
    for (let i = 0; i < lines.length; i+=2){
        const id = this.camelize(lines[i]);
        const child =(<div>
            <p>- id: {id} <br/>
                label: {lines[i]}<br/>
                format: '(1,234.10)'<br/>
                visible: =IF(OR({id}=0,{id}=NULL),FALSE,TRUE)</p>
        </div>);
        layoutChildren.push(child);
    }
    return layoutChildren
};

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Amazing Suggestion Generator</h1>
                    <TextArea
                        onChange={(event) => {this.setState({textArea: event.target.value})}}
                        value={this.state.textArea || ''}
                        name="default"
                        label="Dynamic List Data- Label- Amount"
                        rows={20}
                        white-space='pre-wrap'
                    />
                    <div>{this.interpretation(this.state.textArea.replace(/^\s*\n/gm,''))}</div>
                    <div>{this.makeLayout(this.state.textArea.replace(/^\s*\n/gm,''))}
                    </div>
                    <div>{this.makeModel(this.state.textArea.replace(/^\s*\n/gm,''))}
                    </div>
                </header>
            </div>
        );
    }
}
