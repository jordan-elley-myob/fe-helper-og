import React from 'react';
import './App.css';
import {TextArea} from "@myob/myob-widgets";


function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

function makeModel(textRaw){
  const lines = textRaw.split("\n");
  const layoutChildren = [(<h2>Some Entrys for model which might be useful</h2>)];
  for (let i = 0; i < lines.length; i+=2) {
    const id = camelize(lines[i]);
    const child = (
        <div>
          <p>{id}: <br/>
          type: number</p>
    </div>)
    layoutChildren.push(child)
  }
  layoutChildren.push(<h2>Other suggestions</h2>)
  for (let i = 1; i < lines.length; i+=2) {
    const id =lines[i];
    const child = (
        <div>
          <p>{id}: <br/>
            type: number</p>
        </div>)
    layoutChildren.push(child)
  }
  layoutChildren.push(<h2>Source suggestions</h2>)

  for (let i = 1; i < lines.length; i+=2) {
    const id =lines[i];
    const child = (
        <div>
          <p>{id}: <br/>
            source: forms/tax-forms-nz.*/{id}</p>
        </div>)
    layoutChildren.push(child)
  }

  return layoutChildren
}

//make an option to set manual Id
function makeLayout(textRaw){
  const lines = textRaw.split("\n");
  const layoutChildren = [(<h1>Layout Children</h1>)];
  for (let i = 0; i < lines.length; i+=2){
    const id = camelize(lines[i])
    const child =(<div>
         <p>- id: {id} <br/>
           label: {lines[i]}<br/>
           format: '(1,234.10)'<br/>
           visible: =IF(OR({id}=0,{id}=NULL),FALSE,TRUE)</p>
       </div>)
    layoutChildren.push(child);
  }
  return layoutChildren
}

function App() {
  const [textArea, onTextAreaChange] = React.useState('');
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hi</h1>
        <TextArea
            onChange={(event) => {onTextAreaChange(event.target.value)}}
            value={textArea || ''}
            name="default"
            label="Dynamic List Data- Label- Amount"
            rows={20}
            white-space='pre-wrap'
        />

        <div>
          {
            makeLayout(textArea.replace(/^\s*\n/gm,'')) //removes empty lines
          }
        </div>
        <div>
          {
            makeModel(textArea.replace(/^\s*\n/gm,'')) //removes empty lines
          }
        </div>
      </header>
    </div>
  );
}

export default App;

// - id: studentLoanEndOfYear
// label: Student loan end of year
// format: '(1,234.10)'
// visible: =IF(OR(studentLoanEndOfYear=0,studentLoanEndOfYear=NULL),FALSE,TRUE)
