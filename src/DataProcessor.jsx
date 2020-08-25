import React from "react";

export default class DataProcessor extends React.Component{
    camelize = (str) => {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    };

    interpretation = (lines) => {
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

    makeModel = (lines) => {
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
        layoutChildren.push(<h2>Source suggestions</h2>);

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


    makeLayout =(lines)=>{
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

    createDataStructure = (lines) => {
        const data = {};
        for (let i = 0; i < lines.length; i+=2) {
            const id = this.camelize(lines[i]);
            data[id] = {
                label: lines[i],
                sources: [lines[i+1]]
            }
        }
        return data;
    };

    removeBlankLines = rawText=>rawText.replace(/^\s*\n/gm,'');
    getListOfLines = text => this.removeBlankLines(text).split("\n");

    processedData = () =>{
        const processedText = this.getListOfLines(this.props.textArea);
        console.log(this.createDataStructure(processedText));
        return (<div>
            <div>{this.interpretation(processedText)}</div>
            <div>{this.makeLayout(processedText)}</div>
            <div>{this.makeModel(processedText)}</div>
        </div>)
    };

    render() {
        return this.processedData()
    }

    /*
    * Data structure to use
    * {
    *   camelcaseLabel1: {label: label1, sources: [source1]},
    *   camelcaseLabel2: {label: label2, sources: [source2]},
    * */
}
