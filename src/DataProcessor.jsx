import React from "react";
import Interpreter from "./Interpreter";

export default class DataProcessor extends React.Component{
    camelize = (str) => {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    };


makeModel = (structuredData) => {
        const layoutChildren = [(<h2>Some Entry's for model which might be useful</h2>)];
    for(const [id, value] of Object.entries(structuredData)) {
            const child = (
                <div>
                    <p>{id}: <br/>
                        type: number</p>
                </div>);
            layoutChildren.push(child)
        }
        layoutChildren.push(<h2>Other suggestions</h2>);
    for(const [id, value] of Object.entries(structuredData)) {
            const child = (
                <div>
                    <p>{value.source}: <br/>
                        type: number</p>
                </div>);
            layoutChildren.push(child)
        }
        layoutChildren.push(<h2>Source suggestions</h2>);

    for(const [id, value] of Object.entries(structuredData)) {
            const child = (
                <div>
                    <p>{value.source}: <br/>
                        source: forms/tax-forms-nz.*/{value.source}</p>
                </div>);
            layoutChildren.push(child)
        }

        return layoutChildren
    };



    makeLayout =(structuredData)=>{
        const layoutChildren = [(<h1>Layout Children</h1>)];
        for(const [id, value] of Object.entries(structuredData)) {
            const child =(<div>
                <p>- id: {id} <br/>
                    label: {value.label}<br/>
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
                source: lines[i+1]
            }
        }
        return data;
    };

    removeBlankLines = rawText=>rawText.replace(/^\s*\n/gm,'');
    getListOfLines = text => this.removeBlankLines(text).split("\n");

    processedData = () =>{
        let processedText = this.getListOfLines(this.props.textArea);
        processedText = (this.createDataStructure(processedText));
        return (<div>
            <Interpreter data={processedText}/>
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
