import React from 'react';
import './App.css';
import { TextArea} from "@myob/myob-widgets";
function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

function makeLayout(textRaw){
  const lines = textRaw.split("\n");
  var sectionChildren = <div/>;
  for (let i = 0; i < lines.length; i+=2){
    sectionChildren+=<div>
      <h1>Layout Child</h1>
      <p>- id: {camelize(lines[i])} <br/>
        label: {lines[i]}<br/>
        format: '(1,234.10)'<br/>
        visible: =IF(OR({lines[i]}=0,{lines[i]}=NULL),FALSE,TRUE)</p>
    </div>

  }
  // return (<div>
  //   <h1>Layout Child</h1>
  //   <p>- id: {camelize(lines[0])} <br/>
  //     label: {lines[0]}<br/>
  //     format: '(1,234.10)'<br/>
  //     visible: =IF(OR({lines[0]}=0,{lines[0]}=NULL),FALSE,TRUE)</p>
  // </div>)

  return (sectionChildren)
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
            label="Dynamic List Data"
            rows={8}
            white-space='pre-wrap'
        />

        <div>
          {makeLayout(textArea)}
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
