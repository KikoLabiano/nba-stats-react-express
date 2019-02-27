import React, { Component } from 'react';
import StatComponent from './StatComponent';
import {Tabs, Tab} from 'react-materialize';

class StatContainerComponent extends Component{

    render() {

        return(
            <div className="container">
            <div className="section">
            <Tabs className='tab-demo z-depth-1' >
                <Tab title="Season" active>
                {this.props.StatsSeason.map((stat,i)=> <StatComponent key={i} {...stat}/>)}
                </Tab>
                <Tab title="NBA Today"></Tab>
                <Tab title="Historical"></Tab>
                <Tab title="Highs"></Tab>
            </Tabs>
            </div>
            <br/>
            <br/>
        </div>    
        );
    }
}

export default StatContainerComponent