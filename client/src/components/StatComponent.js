import React, { Component } from 'react';
import {Card, Col,Table, Modal, Button} from 'react-materialize'
import PlayerComponent from './players/PlayerComponent';

class StatComponent extends Component{
    constructor(props){
        super(props);
    }

    createTable = () => {
        let table = []

        // this.props.rowset.map((row, i) => {
        //     table.push(<tr>)
        //     row.map((r,j)=>({
        //         table.push(<td>{r[0]}</td>
        //             <td>{r[2]}</td>
        //             <td>{r[4]}</td>
        //             <td>{r[8]}</td>)                
        //     }));
        //     table.push(</th>)
        // });

        // Outer loop to create parent

        // this.props.rowSet.map((row,i)=>{
        //     let children = [];
        //     children.push(<td>{row[i][0]}</td>);
        //             children.push(<td>{row[i][2]}</td>);
        //             children.push(<td>{row[i][4]}</td>);
        //             children.push(<td>{row[i][8]}</td>);
        //         table.push(<tr>{children}</tr>)
        // });

        for (let i = 0; i < this.props.rowSet.length; i++) {
          let children = []     
            children.push(<td>{this.props.rowSet[i][0]}</td>);
            children.push(<td><PlayerComponent playerName={this.props.rowSet[i][2]}
                trigger={<a>{this.props.rowSet[i][2]}</a>} playerId={this.props.rowSet[i][1]}></PlayerComponent></td>);
            children.push(<td>{this.props.rowSet[i][4]}</td>);
            children.push(<td>{this.props.rowSet[i][8]}</td>);
          table.push(<tr>{children}</tr>)
        }
       
        return table
      }

    render(){

        return(
            <Col m={6} s={12}>
                <Card textClassName='black-text' title={this.props.headers[this.props.headers.length-1]}>
                    <Table>  
                    <thead>
                        <tr>
                        <th data-field="id">Rank</th>
                        <th data-field="playerName">Player</th>
                        <th data-field="playerTeam">Team</th>
                        <th data-field="dataValue">#</th>
                        </tr>
                    </thead>                  
                    <tbody>
                        {this.createTable()}
                    </tbody>
                    </Table>
                </Card>
            </Col>
        );
    }
}

export default StatComponent;