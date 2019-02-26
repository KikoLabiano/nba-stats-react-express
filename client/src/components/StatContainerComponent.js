import React, { Component } from 'react';
import StatComponent from './StatComponent';
import {Tabs, Tab} from 'react-materialize';

class StatContainerComponent extends Component{

    constructor(props){
        super(props);
        console.log(props.StatsSeason)
    }   

    render() {

        return(
            <div className="container">
            <div className="section">
            <Tabs className='tab-demo z-depth-1' >
                <Tab title="NBA Today" active>
                {this.props.StatsSeason.map((stat,i)=> <StatComponent key={i} {...stat}/>)}
                </Tab>
                <Tab title="Season">Season</Tab>
                <Tab title="Historical">Historical</Tab>
                <Tab title="Highs">Highs</Tab>
            </Tabs>
            </div>
            <br/>
            <br/>
        </div>    
        );
    }
}

export default StatContainerComponent