import React, { Component } from 'react';
import {Tabs, Tab} from 'react-materialize';
import PlayerChartComponent from './PlayerChartComponent';
import PlayerBarChartComponent from './PlayerBarChartComponent';

class PlayerStatChartsContainerComponent extends Component{

state={
    allData:{}
}

    componentDidMount(){
            this.getPlayerStats()
          .then(res => {
              this.setState({
                allData: res
              });
        })
          .catch(err => console.log(err));
      }

      getPlayerStats = async () => {
        const response = await fetch('/api/playerStats/' + this.props.playerId);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
      };

    render(){
        return(
            <div className="container playerStatChartsContainer">
            <div className="section">
            <Tabs className='tab-demo z-depth-1' >
                <Tab title="Career RS Stats" active >
                    <PlayerChartComponent statType="SeasonTotalsRegularSeason" data={this.state.allData}></PlayerChartComponent>
                </Tab>
                <Tab title="Career Playoff Stats" active >
                    <PlayerChartComponent statType="SeasonTotalsPostSeason" data={this.state.allData}></PlayerChartComponent>
                </Tab>
                <Tab title="Career totals"></Tab>
                <Tab title="Career highs">
                    <PlayerBarChartComponent statType="CareerHighs" data={this.state.allData}/>
                </Tab>
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