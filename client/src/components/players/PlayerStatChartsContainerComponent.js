import React, { Component } from 'react';
import {Tabs, Tab} from 'react-materialize';

class PlayerStatChartsContainerComponent extends Component{

    state={
        playerPointsBySeason:[],
        playerReboundsBySeason:[]
    }

    getPlayerStats = () => {
        this.callApi()
          .then(res => {
              let seasonTotalsRS = res.resultSets.filter( function (el) {
                return el.name === "SeasonTotalsRegularSeason";
              });
            console.log(seasonTotalsRS[0].rowSet);
            // this.setState({         
            //     playerPointsBySeason: res
            // });
        })
          .catch(err => console.log(err));
      }


    callApi = async () => {
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
                <Tab title="Points" active onShow={this.getPlayerStats(this.props.playerId)}>

                </Tab>
                <Tab title="Rebounds"></Tab>
                <Tab title="Assists"></Tab>
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