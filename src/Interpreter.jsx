import React from "react";

export default class Interpreter extends React.Component{
    render(){
    const structuredData= this.props.data;
    const rowEntrys =[];
        for(const [id, value] of Object.entries(structuredData)) {
            rowEntrys.push(
                <tr>
                    <td>{id}</td>
                    <td>{value.label}</td>
                    <td>{value.source}</td>
                </tr>

            )
        }
        return(
            <table border="1px">
            <tr>
                <th>id</th>
                <th>label</th>
                <th>Source</th>
            </tr>
                {rowEntrys}
        </table>)
    }
}
