import React, { Component } from 'react';
import {Tabs, Tab} from 'react-materialize';
import PlayerChartComponent from './PlayerChartComponent';


class PlayerStatChartsContainerComponent extends Component{

    

    render(){
        return(
            <div className="container playerStatChartsContainer">
            <div className="section">
            <Tabs className='tab-demo z-depth-1' >
                <Tab title="Career RS Stats" active >
                    <PlayerChartComponent statType="SeasonTotalsRegularSeason" playerId={this.props.playerId}></PlayerChartComponent>
                </Tab>
                <Tab title="Career Playoff Stats" active >
                    <PlayerChartComponent statType="SeasonTotalsPostSeason" playerId={this.props.playerId}></PlayerChartComponent>
                </Tab>
                <Tab title="Career totals"></Tab>
                <Tab title="Career highs"></Tab>
                <Tab title="Blocks"></Tab>
            </Tabs>
            </div>
            <br/>
            <br/>
        </div>    

        );
    }

}

export default PlayerStatChartsContainerComponent;