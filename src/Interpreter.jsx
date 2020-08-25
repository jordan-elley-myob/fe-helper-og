import React from "react";

export default class Interpreter extends React.Component{
    render(){
    const structuredData= this.props.data;
        return(<table border="1px">
            <tr>
                <th>label</th>
                <th>Source</th>
            </tr>
            <tr>
                <td>{structuredData[0]?.label}</td>
                <td>{structuredData[0]?.source}</td>
            </tr>
            <tr>
                <td>{structuredData[1]?.label}</td>
                <td>{structuredData[1]?.source}</td>
            </tr>
        </table>)}
}
